'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/login?error=credenciais')
  }

  const supabase = createClient()

  let authError: string | null = null

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      authError = error.message
    }
  } catch {
    redirect('/login?error=geral')
  }

  if (authError) {
    if (
      authError.includes('Invalid login credentials') ||
      authError.includes('invalid_credentials') ||
      authError.includes('Email not confirmed')
    ) {
      redirect('/login?error=credenciais')
    }
    redirect('/login?error=geral')
  }

  redirect('/dashboard')
}
