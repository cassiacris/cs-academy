'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError) {
        setError(
          authError.message.includes('Invalid login credentials') || authError.message.includes('invalid_credentials')
            ? 'E-mail ou senha incorretos. Verifique e tente novamente.'
            : `Erro: ${authError.message}`
        )
        setLoading(false)
        return
      }

      // Sessão gravada nos cookies pelo browser client — hard redirect para o middleware ler
      window.location.href = '/dashboard'
    } catch {
      setError('Erro de conexão. Verifique sua internet e tente novamente.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cs-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cs-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cs-gold/3 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A435 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-baseline gap-1 mb-3">
            <span className="text-4xl font-black text-cs-gold tracking-tight">CS</span>
            <span className="text-4xl font-light text-cs-white tracking-widest uppercase">Academy</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cs-gold/40" />
            <span className="text-xs text-cs-white-dim tracking-widest uppercase font-medium">Acesso exclusivo</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-cs-gold/40" />
          </div>
        </div>

        <div
          className="bg-cs-black-surface rounded-2xl p-8 border"
          style={{
            boxShadow: '0 0 40px rgba(201, 164, 53, 0.08), 0 4px 24px rgba(0,0,0,0.6)',
            borderColor: 'rgba(201, 164, 53, 0.2)',
          }}
        >
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-cs-white">Bem-vinda de volta</h1>
            <p className="text-sm text-cs-white-muted mt-1">
              Entre com suas credenciais para acessar a plataforma
            </p>
          </div>

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
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cs-white-dim hover:text-cs-white-muted transition-colors"
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
        </div>

        <p className="text-center text-xs text-cs-white-dim mt-6 leading-relaxed">
          Acesso exclusivo para alunas matriculadas em cursos da CS Academy.
          <br />
          Em caso de dúvidas, entre em contato via{' '}
          <a
            href="https://wa.me/5548999888464"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cs-gold hover:text-cs-gold-hover transition-colors"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    </main>
  )
}
