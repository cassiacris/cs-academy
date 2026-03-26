import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, CheckCircle } from 'lucide-react'
import { mockCourses } from '@/lib/mock-data'
import { formatDuration } from '@/lib/utils'
import ModuleAccordion from '@/components/cursos/ModuleAccordion'
import Button from '@/components/ui/Button'

interface PageProps {
  params: { slug: string }
}

export default function CourseOverviewPage({ params }: PageProps) {
  const course = mockCourses.find((c) => c.slug === params.slug)

  if (!course) notFound()

  const completedLessons =
    course.modules?.flatMap((m) => m.lessons).filter((l) => l.completed)
      .length || 0
  const totalLessons = course.total_lessons
  const progress = course.progress || 0

  const firstIncomplete = course.modules
    ?.flatMap((m) => m.lessons)
    .find((l) => !l.completed)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back nav */}
      <Link
        href="/cursos"
        className="inline-flex items-center gap-2 text-sm text-cs-white-muted hover:text-cs-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Cursos
      </Link>

      {/* Course header */}
      <div
        className="relative rounded-2xl overflow-hidden p-8"
        style={{
          background:
            course.slug === 'box-magnetize'
              ? 'linear-gradient(135deg, #1A1A1A 0%, #2A1F05 50%, #3D2F0A 100%)'
              : 'linear-gradient(135deg, #0A1628 0%, #1A2440 50%, #1E3560 100%)',
          border: '1px solid rgba(201, 164, 53, 0.2)',
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(201, 164, 53, 0.1)',
                  border: '1px solid rgba(201, 164, 53, 0.2)',
                }}
              >
                <span className="text-2xl">
                  {course.slug === 'box-magnetize' ? '✦' : '◈'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cs-white">
                  {course.title}
                </h1>
                <p className="text-sm text-cs-gold font-medium">
                  {course.modules?.length} módulos
                </p>
              </div>
            </div>
            <p className="text-sm text-cs-white-muted leading-relaxed max-w-xl">
              {course.description}
            </p>
            <div className="flex items-center gap-5 mt-4">
              <span className="text-xs text-cs-white-dim flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {totalLessons} aulas
              </span>
              <span className="text-xs text-cs-white-dim flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {formatDuration(course.total_duration)}
              </span>
            </div>
          </div>

          {/* Progress card */}
          <div
            className="lg:w-64 rounded-xl p-5"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(201, 164, 53, 0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-cs-white-muted uppercase tracking-wide">
                Seu Progresso
              </span>
              <span className="text-sm font-bold text-cs-gold">{progress}%</span>
            </div>
            <div className="h-2 bg-black/40 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-cs-gold to-cs-gold-hover rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-cs-white-dim mb-4">
              {completedLessons} de {totalLessons} aulas concluídas
            </p>
            {firstIncomplete && (
              <Link
                href={`/cursos/${course.slug}/${firstIncomplete.id}`}
                className="w-full bg-cs-gold text-cs-black text-sm font-semibold py-2.5 rounded-lg hover:bg-cs-gold-hover transition-colors flex items-center justify-center gap-2"
              >
                {progress > 0 ? 'Continuar' : 'Começar agora'}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-base font-semibold text-cs-white mb-4">
          Conteúdo do curso
        </h2>
        <div className="space-y-3">
          {course.modules?.map((module, index) => (
            <ModuleAccordion
              key={module.id}
              module={module}
              courseSlug={course.slug}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
