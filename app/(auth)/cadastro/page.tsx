import { Metadata } from 'next'
import CadastroForm from '@/components/auth/CadastroForm'

export const metadata: Metadata = {
  title: 'Criar Conta — CS Academy',
  description: 'Crie sua conta na plataforma CS Academy',
}

export default function CadastroPage() {
  return (
    <main className="min-h-screen bg-cs-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cs-gold/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #C9A435 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-baseline gap-1 mb-3">
            <span className="text-4xl font-black text-cs-gold tracking-tight">CS</span>
            <span className="text-4xl font-light text-cs-white tracking-widest uppercase">
              Academy
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cs-gold/40" />
            <span className="text-xs text-cs-white-dim tracking-widest uppercase font-medium">
              Criar conta
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-cs-gold/40" />
          </div>
        </div>

        {/* Card */}
        <div
          className="bg-cs-black-surface rounded-2xl p-8 border"
          style={{
            boxShadow: '0 0 40px rgba(201, 164, 53, 0.08), 0 4px 24px rgba(0,0,0,0.6)',
            borderColor: 'rgba(201, 164, 53, 0.2)',
          }}
        >
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-cs-white">Crie sua conta</h1>
            <p className="text-sm text-cs-white-muted mt-1">
              Preencha os dados abaixo para acessar a plataforma
            </p>
          </div>

          <CadastroForm />
        </div>

        <p className="text-center text-xs text-cs-white-dim mt-6">
          Ao criar sua conta, você concorda com os{' '}
          <span className="text-cs-gold">Termos de Uso</span> da CS Academy.
        </p>
      </div>
    </main>
  )
}
