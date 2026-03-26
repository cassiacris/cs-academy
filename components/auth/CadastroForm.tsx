'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function CadastroForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos')
      return
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'student',
          },
        },
      })

      if (signUpError) {
        if (signUpError.message === 'User already registered') {
          setError('Este e-mail já está cadastrado. Faça login.')
        } else {
          setError('Erro ao criar conta. Tente novamente.')
        }
        return
      }

      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
          <span className="text-2xl">✓</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-cs-white">Conta criada!</h3>
          <p className="text-sm text-cs-white-muted mt-1">
            Verifique seu e-mail para confirmar o cadastro. Você será redirecionada em instantes.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome completo"
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={<User className="w-4 h-4" />}
        autoComplete="name"
        required
      />

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
        placeholder="Mínimo 8 caracteres"
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
        autoComplete="new-password"
        required
      />

      <Input
        label="Confirmar senha"
        type={showPassword ? 'text' : 'password'}
        placeholder="Repita a senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={<Lock className="w-4 h-4" />}
        autoComplete="new-password"
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
        className="w-full"
      >
        {loading ? 'Criando conta...' : 'Criar minha conta'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-cs-white-dim">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="text-cs-gold hover:text-cs-gold-hover font-medium transition-colors"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </form>
  )
}
