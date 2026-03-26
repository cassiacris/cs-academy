import {
  Users,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Plus,
  Upload,
  FileText,
  Activity,
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    label: 'Total de alunas',
    value: '47',
    change: '+8 este mês',
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    label: 'Matrículas ativas',
    value: '82',
    change: 'em 2 cursos',
    icon: BookOpen,
    color: 'text-cs-gold',
    bg: 'bg-cs-gold-dim',
    border: 'border-cs-gold/20',
  },
  {
    label: 'Posts no feed',
    value: '23',
    change: '+3 esta semana',
    icon: MessageSquare,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    label: 'Materiais',
    value: '6',
    change: 'disponíveis',
    icon: FileText,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
]

const quickActions = [
  {
    href: '/admin/cursos',
    label: 'Adicionar aula',
    description: 'Nova aula em um curso existente',
    icon: Plus,
    color: 'text-cs-gold',
    bg: 'bg-cs-gold-dim',
  },
  {
    href: '/admin/feed',
    label: 'Publicar no feed',
    description: 'Novo post para a comunidade',
    icon: MessageSquare,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    href: '/admin/materiais',
    label: 'Upload de material',
    description: 'PDF, áudio ou link',
    icon: Upload,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    href: '/admin/alunas',
    label: 'Ver alunas',
    description: 'Gerenciar matrículas',
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
]

const recentActivity = [
  {
    action: 'Nova matrícula',
    detail: 'Ana Paula adquiriu Box Magnetize via Hotmart',
    time: 'há 2 horas',
    type: 'enrollment',
  },
  {
    action: 'Novo comentário',
    detail: 'Fernanda comentou no post "Primeiro Você, Depois o Mundo"',
    time: 'há 5 horas',
    type: 'comment',
  },
  {
    action: 'Nova matrícula',
    detail: 'Mariana S. adquiriu Método PAV via Hubla',
    time: 'há 1 dia',
    type: 'enrollment',
  },
  {
    action: 'Material acessado',
    detail: 'Workbook — Identidade de Alto Valor foi baixado 12x hoje',
    time: 'há 1 dia',
    type: 'material',
  },
  {
    action: 'Nova aluna',
    detail: 'Carla M. criou sua conta e fez login pela primeira vez',
    time: 'há 2 dias',
    type: 'user',
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-cs-white">
          Painel Administrativo
        </h1>
        <p className="text-sm text-cs-white-muted mt-1">
          Visão geral da plataforma CS Academy
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-cs-black-surface border border-cs-border rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-cs-white">{stat.value}</p>
              <p className="text-xs text-cs-white-muted mt-0.5">{stat.label}</p>
              <p className="text-xs text-cs-white-dim mt-1">{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-cs-white-muted uppercase tracking-wider mb-4">
          Ações rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className="bg-cs-black-surface border border-cs-border rounded-xl p-5 hover:border-cs-gold/30 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center mb-3`}
                >
                  <Icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <p className="text-sm font-semibold text-cs-white group-hover:text-cs-gold transition-colors">
                  {action.label}
                </p>
                <p className="text-xs text-cs-white-dim mt-0.5">
                  {action.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-sm font-semibold text-cs-white-muted uppercase tracking-wider mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Atividade recente
        </h2>
        <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden">
          {recentActivity.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 px-5 py-4 ${
                index < recentActivity.length - 1
                  ? 'border-b border-cs-border-subtle'
                  : ''
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-cs-gold flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-cs-white">
                  {item.action}
                </p>
                <p className="text-xs text-cs-white-muted truncate">
                  {item.detail}
                </p>
              </div>
              <span className="text-xs text-cs-white-dim flex-shrink-0">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
