import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const COURSE_MAP: Record<string, string> = {
  'box-magnetize-kiwify': 'box-magnetize',
  'metodo-pav-kiwify': 'metodo-pav',
}

interface KiwifyWebhookPayload {
  webhook_event_type: string
  order_id: string
  order_status: string
  Customer: {
    full_name: string
    email: string
  }
  Product: {
    product_id: string
    product_name: string
  }
}

function verifyKiwifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha1', secret)
  hmac.update(payload)
  const expected = `sha1=${hmac.digest('hex')}`
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-kiwify-signature') || ''

    if (process.env.KIWIFY_SECRET && !verifyKiwifySignature(rawBody, signature, process.env.KIWIFY_SECRET)) {
      console.error('[Kiwify] Invalid signature')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload: KiwifyWebhookPayload = JSON.parse(rawBody)
    console.log('[Kiwify] Received webhook:', payload.webhook_event_type)

    if (payload.webhook_event_type !== 'order_approved' || payload.order_status !== 'paid') {
      return NextResponse.json({ message: 'Event ignored' }, { status: 200 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const email = payload.Customer.email.toLowerCase().trim()
    const name = payload.Customer.full_name
    const courseSlug = COURSE_MAP[payload.Product.product_id] || 'box-magnetize'

    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const userExists = existingUsers?.users?.find((u) => u.email === email)

    let userId: string

    if (userExists) {
      userId = userExists.id
      console.log(`[Kiwify] User already exists: ${email}`)
    } else {
      const tempPassword = `CS${Math.random().toString(36).slice(2, 10).toUpperCase()}!`
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { name, role: 'student' },
      })

      if (createError || !newUser.user) {
        console.error('[Kiwify] Error creating user:', createError)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }

      userId = newUser.user.id
      console.log(`[Kiwify] Created user: ${email} — temp password: ${tempPassword}`)
    }

    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', courseSlug)
      .single()

    if (course) {
      await supabase.from('enrollments').upsert(
        { user_id: userId, course_id: course.id, source: 'kiwify', transaction_id: payload.order_id },
        { onConflict: 'user_id,course_id' }
      )
      console.log(`[Kiwify] Enrollment created: ${email} → ${courseSlug}`)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[Kiwify] Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
