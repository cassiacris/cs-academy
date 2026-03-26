import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const COURSE_MAP: Record<string, string> = {
  'box-magnetize-hotmart': 'box-magnetize',
  'metodo-pav-hotmart': 'metodo-pav',
}

interface HotmartWebhookPayload {
  event: string
  data: {
    buyer: {
      email: string
      name: string
    }
    product: {
      id: string
      name: string
    }
    purchase: {
      status: string
      transaction: string
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const hottok = request.headers.get('hottok')
    if (hottok !== process.env.HOTMART_HOTTOK) {
      console.error('[Hotmart] Invalid hottok header')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload: HotmartWebhookPayload = await request.json()
    console.log('[Hotmart] Received webhook:', payload.event)

    if (
      payload.event !== 'PURCHASE_COMPLETE' &&
      payload.event !== 'PURCHASE_APPROVED'
    ) {
      return NextResponse.json({ message: 'Event ignored' }, { status: 200 })
    }

    const { buyer, product, purchase } = payload.data

    if (purchase.status !== 'APPROVED' && purchase.status !== 'COMPLETE') {
      return NextResponse.json({ message: 'Purchase not approved' }, { status: 200 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const email = buyer.email.toLowerCase().trim()
    const name = buyer.name
    const courseSlug = COURSE_MAP[product.id] || 'box-magnetize'

    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const userExists = existingUsers?.users?.find((u) => u.email === email)

    let userId: string

    if (userExists) {
      userId = userExists.id
      console.log(`[Hotmart] User already exists: ${email}`)
    } else {
      const tempPassword = `CS${Math.random().toString(36).slice(2, 10).toUpperCase()}!`
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { name, role: 'student' },
      })

      if (createError || !newUser.user) {
        console.error('[Hotmart] Error creating user:', createError)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }

      userId = newUser.user.id
      console.log(`[Hotmart] Created user: ${email} — temp password: ${tempPassword}`)
    }

    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', courseSlug)
      .single()

    if (course) {
      await supabase.from('enrollments').upsert(
        { user_id: userId, course_id: course.id, source: 'hotmart', transaction_id: purchase.transaction },
        { onConflict: 'user_id,course_id' }
      )
      console.log(`[Hotmart] Enrollment created: ${email} → ${courseSlug}`)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[Hotmart] Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
