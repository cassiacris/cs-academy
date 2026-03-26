import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  // Coletamos os cookies que o Supabase quer setar
  const cookiesToSet: { name: string; value: string; options: Record<string, unknown> }[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAll(cookies: any[]) {
          cookiesToSet.push(...cookies)
        },
      },
    }
  )

  let authError: string | null = null

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) authError = error.message
  } catch {
    return NextResponse.json({ error: 'geral' }, { status: 500 })
  }

  if (authError) {
    const tipo =
      authError.includes('Invalid login credentials') ||
      authError.includes('invalid_credentials') ||
      authError.includes('Email not confirmed')
        ? 'credenciais'
        : 'geral'
    return NextResponse.json({ error: tipo }, { status: 401 })
  }

  // Monta a resposta e aplica os cookies de sessão explicitamente
  const response = NextResponse.json({ success: true })
  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options)
  })
  return response
}
