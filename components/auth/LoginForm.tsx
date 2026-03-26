'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })

      if (res.ok) {
        // Hard redirect para garantir que os cookies de sessão chegam ao middleware
        window.location.href = '/dashboard'
        return
      }

      const data = await res.json()
      if (data.error === 'credenciais') {
        setError('E-mail ou senha incorretos. Verifique e tente novamente.')
      } else {
        setError('Erro ao fazer login. Tente novamente.')
      }
    } catch {
      setError('Erro de conexão. Verifique sua internet e tente novamente.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-cs-white-muted">E-mail</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cs-white-dim">
            <Mail className="w-4 h-4" />
          </span>
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            autoComplete="email"
            className="w-full bg-cs-black border border-cs-border rounded-xl pl-10 pr-4 py-3 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-cs-white-muted">Senha</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cs-white-dim">
            <Lock className="w-4 h-4" />
          </span>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            className="w-full bg-cs-black border border-cs-border rounded-xl pl-10 pr-4 py-3 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cs-white-dim hover:text-cs-white-muted transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cs-gold hover:bg-cs-gold-hover text-cs-black font-bold py-3.5 rounded-xl transition-colors text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Entrando...' : 'Entrar na plataforma'}
      </button>

      <p className="text-center text-sm text-cs-white-dim">
        Ainda não tem acesso?{' '}
        <Link href="/cadastro" className="text-cs-gold hover:text-cs-gold-hover font-medium transition-colors">
          Criar conta
        </Link>
      </p>
    </form>
  )
}
