'use client'

import { X, Lock, Sparkles, CheckCircle } from 'lucide-react'
import { Course } from '@/types'

interface UpsellModalProps {
  course: Course
  onClose: () => void
}

export default function UpsellModal({ course, onClose }: UpsellModalProps) {
  const benefits =
    course.slug === 'box-magnetize'
      ? [
          '4 reprogramações mentais completas em áudio',
          'Módulos de autoimagem, vendas, dinheiro e posicionamento',
          'Acesso vitalício — ouça quantas vezes quiser',
          'Atualizações incluídas',
        ]
      : [
          'Todos os 5 módulos do Método PAV completos',
          '14 aulas + encontro mensal de tira-dúvidas ao vivo',
          'Método EVA — Essência, Valor e Autoimagem',
          'Acesso à comunidade exclusiva CS Academy',
          'Materiais de apoio incluídos',
        ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden animate-fade-in"
        style={{
          background: 'linear-gradient(160deg, #141414 0%, #1A1A0A 60%, #1E1800 100%)',
          border: '1px solid rgba(201, 164, 53, 0.3)',
          boxShadow: '0 0 60px rgba(201, 164, 53, 0.1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-cs-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(201, 164, 53, 0.1)',
                border: '1px solid rgba(201, 164, 53, 0.25)',
              }}
            >
              <Lock className="w-5 h-5 text-cs-gold" />
            </div>
            <div>
              <p className="text-xs text-cs-gold font-semibold uppercase tracking-wider">
                Conteúdo Premium
              </p>
              <h2 className="text-lg font-bold text-cs-white">
                {course.title}
              </h2>
            </div>
          </div>

          <p className="text-sm text-cs-white-muted leading-relaxed">
            Esta aula faz parte do conteúdo completo. Desbloqueie agora e tenha
            acesso imediato a tudo que está incluído:
          </p>
        </div>

        {/* Benefits */}
        <div className="px-6 pb-5">
          <ul className="space-y-2.5">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cs-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm text-cs-white-muted">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price + CTA */}
        <div
          className="mx-6 mb-6 p-5 rounded-xl"
          style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(201, 164, 53, 0.15)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-cs-white-dim">Investimento único</p>
              <p className="text-2xl font-bold text-cs-white">
                {course.price}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-cs-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acesso vitalício</span>
            </div>
          </div>

          <a
            href={course.purchase_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-cs-gold hover:bg-cs-gold-hover text-cs-black font-bold py-3.5 rounded-xl transition-colors text-sm"
          >
            Quero desbloquear agora
          </a>

          <p className="text-center text-xs text-cs-white-dim mt-3">
            Compra segura · Acesso imediato após pagamento
          </p>
        </div>
      </div>
    </div>
  )
}
