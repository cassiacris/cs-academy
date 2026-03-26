import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const COURSE_MAP: Record<string, string> = {
  'box-magnetize-hubla': 'box-magnetize',
  'metodo-pav-hubla': 'metodo-pav',
}

interface HublaWebhookPayload {
  type: string
  data: {
    customer: {
      email: string
      name: string
    }
    product: {
      id: string
      name: string
    }
    payment: {
      status: string
      id: string
    }
  }
}

function verifyHublaSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const expected = hmac.digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-hubla-signature') || ''

    if (process.env.HUBLA_SECRET && !verifyHublaSignature(rawBody, signature, process.env.HUBLA_SECRET)) {
      console.error('[Hubla] Invalid signature')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload: HublaWebhookPayload = JSON.parse(rawBody)
    console.log('[Hubla] Received webhook:', payload.type)

    if (payload.type !== 'payment.confirmed' && payload.type !== 'sale.approved') {
      return NextResponse.json({ message: 'Event ignored' }, { status: 200 })
    }

    const { customer, product, payment } = payload.data

    if (payment.status !== 'confirmed' && payment.status !== 'approved') {
      return NextResponse.json({ message: 'Payment not confirmed' }, { status: 200 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const email = customer.email.toLowerCase().trim()
    const name = customer.name
    const courseSlug = COURSE_MAP[product.id] || 'box-magnetize'

    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const userExists = existingUsers?.users?.find((u) => u.email === email)

    let userId: string

    if (userExists) {
      userId = userExists.id
      console.log(`[Hubla] User already exists: ${email}`)
    } else {
      const tempPassword = `CS${Math.random().toString(36).slice(2, 10).toUpperCase()}!`
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { name, role: 'student' },
      })

      if (createError || !newUser.user) {
        console.error('[Hubla] Error creating user:', createError)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }

      userId = newUser.user.id
      console.log(`[Hubla] Created user: ${email} — temp password: ${tempPassword}`)
    }

    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', courseSlug)
      .single()

    if (course) {
      await supabase.from('enrollments').upsert(
        { user_id: userId, course_id: course.id, source: 'hubla', transaction_id: payment.id },
        { onConflict: 'user_id,course_id' }
      )
      console.log(`[Hubla] Enrollment created: ${email} → ${courseSlug}`)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[Hubla] Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
