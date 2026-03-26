import Link from 'next/link'
import { BookOpen, Play, Star, ArrowRight, Clock } from 'lucide-react'
import { mockCourses, mockFeedPosts } from '@/lib/mock-data'
import { formatRelativeDate } from '@/lib/utils'
import CourseCard from '@/components/cursos/CourseCard'

export default async function DashboardPage() {
  const firstName = 'Cássia'

  const coursesInProgress = mockCourses.filter(
    (c) => (c.progress || 0) > 0 && (c.progress || 0) < 100
  )
  const lastCourse = coursesInProgress[0] || mockCourses[0]

  const stats = [
    {
      label: 'Cursos em andamento',
      value: coursesInProgress.length.toString(),
      icon: BookOpen,
      color: 'text-cs-gold',
      bg: 'bg-cs-gold-dim',
    },
    {
      label: 'Aulas concluídas',
      value: '2',
      icon: Play,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Materiais disponíveis',
      value: '6',
      icon: Star,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-cs-white">
          Olá, {firstName}{' '}
          <span className="text-cs-gold">✦</span>
        </h1>
        <p className="text-sm text-cs-white-muted mt-1">
          Bem-vinda à sua plataforma de transformação. Continue de onde parou.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-cs-black-surface border border-cs-border rounded-xl p-5 flex items-center gap-4"
            >
              <div
                className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-cs-white">{stat.value}</p>
                <p className="text-xs text-cs-white-muted">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Continue where you left off */}
      {lastCourse && (
        <div>
          <h2 className="text-sm font-semibold text-cs-white-muted uppercase tracking-wider mb-4">
            Continuar de onde parou
          </h2>
          <div
            className="relative rounded-xl overflow-hidden border border-cs-gold/20 p-6"
            style={{
              background:
                'linear-gradient(135deg, #141414 0%, #1A1A0A 60%, #3D2F0A 100%)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-xs text-cs-gold uppercase tracking-wide font-medium mb-1">
                  {lastCourse.title}
                </p>
                <h3 className="text-lg font-bold text-cs-white mb-1">
                  {lastCourse.modules?.[0]?.lessons[1]?.title ||
                    'Âncora de Identidade — Ritual de Ativação'}
                </h3>
                <p className="text-sm text-cs-white-muted mb-4 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  18 min · Módulo 1
                </p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-cs-white-muted">Progresso do curso</span>
                    <span className="text-xs text-cs-gold font-medium">
                      {lastCourse.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-cs-black-subtle rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-cs-gold to-cs-gold-hover rounded-full"
                      style={{ width: `${lastCourse.progress}%` }}
                    />
                  </div>
                </div>
                <Link
                  href={`/cursos/${lastCourse.slug}`}
                  className="inline-flex items-center gap-2 bg-cs-gold text-cs-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-cs-gold-hover transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Continuar aula
                </Link>
              </div>
              <div
                className="hidden sm:flex w-24 h-24 rounded-xl items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(201, 164, 53, 0.1)',
                  border: '1px solid rgba(201, 164, 53, 0.2)',
                }}
              >
                <span className="text-4xl">✦</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Courses grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-cs-white-muted uppercase tracking-wider">
            Seus Cursos
          </h2>
          <Link
            href="/cursos"
            className="text-xs text-cs-gold hover:text-cs-gold-hover flex items-center gap-1 transition-colors"
          >
            Ver todos
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* Recent posts preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-cs-white-muted uppercase tracking-wider">
            Da Comunidade
          </h2>
          <Link
            href="/feed"
            className="text-xs text-cs-gold hover:text-cs-gold-hover flex items-center gap-1 transition-colors"
          >
            Ver feed
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {mockFeedPosts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              className="bg-cs-black-surface border border-cs-border rounded-xl p-5 card-hover"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-cs-gold flex items-center justify-center">
                  <span className="text-cs-black font-black text-xs">C</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-cs-white">
                    {post.author_name}
                  </p>
                  <p className="text-xs text-cs-white-dim">
                    {formatRelativeDate(post.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-cs-white-muted line-clamp-3 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-cs-white-dim flex items-center gap-1">
                  ♥ {post.likes_count}
                </span>
                <span className="text-xs text-cs-white-dim">
                  {post.comments.length} comentários
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
