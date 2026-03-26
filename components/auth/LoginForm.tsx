'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Preencha todos os campos')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        if (authError.message === 'Invalid login credentials') {
          setError('E-mail ou senha incorretos. Verifique e tente novamente.')
        } else if (authError.message === 'Email not confirmed') {
          setError('Confirme seu e-mail antes de entrar.')
        } else {
          setError('Erro ao fazer login. Tente novamente.')
        }
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="w-4 h-4" />}
        autoComplete="email"
        required
      />

      <Input
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-cs-white-dim hover:text-cs-white-muted transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        }
        autoComplete="current-password"
        required
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="gold"
        size="lg"
        loading={loading}
        className="w-full mt-2"
      >
        {loading ? 'Entrando...' : 'Entrar na plataforma'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-cs-white-dim">
          Ainda não tem acesso?{' '}
          <Link
            href="/cadastro"
            className="text-cs-gold hover:text-cs-gold-hover font-medium transition-colors"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </form>
  )
}
