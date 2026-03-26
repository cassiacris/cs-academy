'use client'

import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BookOpen,
  Lock,
  Sparkles,
} from 'lucide-react'
import { mockCourses } from '@/lib/mock-data'
import VideoPlayer from '@/components/cursos/VideoPlayer'
import ModuleAccordion from '@/components/cursos/ModuleAccordion'
import Button from '@/components/ui/Button'
import UpsellModal from '@/components/cursos/UpsellModal'
import { useState } from 'react'
import { formatDuration } from '@/lib/utils'

interface PageProps {
  params: { slug: string; aulaId: string }
}

// Simulação: em produção isso vem do banco (se a aluna está matriculada)
const MOCK_ENROLLED = true

export default function LessonPlayerPage({ params }: PageProps) {
  const router = useRouter()
  const course = mockCourses.find((c) => c.slug === params.slug)

  if (!course) notFound()

  const allLessons = course.modules?.flatMap((m) => m.lessons) || []
  const currentIndex = allLessons.findIndex((l) => l.id === params.aulaId)
  const lesson = allLessons[currentIndex]

  if (!lesson) notFound()

  const isLocked = !MOCK_ENROLLED && !lesson.is_free
  const [completed, setCompleted] = useState(lesson.completed || false)
  const [showUpsell, setShowUpsell] = useState(false)

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  const currentModule = course.modules?.find((m) => m.id === lesson.module_id)

  // Se bloqueada: mostra paywall em vez do player
  if (isLocked) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Link
            href={`/cursos/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-cs-white-muted hover:text-cs-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {course.title}
          </Link>
        </div>

        {/* Paywall */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #141414 0%, #1A1A0A 80%, #1E1800 100%)',
            border: '1px solid rgba(201, 164, 53, 0.2)',
          }}
        >
          {/* Blurred preview */}
          <div className="relative aspect-video flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0A0A0A, #1A1A0A)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'rgba(201, 164, 53, 0.1)',
                    border: '2px solid rgba(201, 164, 53, 0.3)',
                  }}
                >
                  <Lock className="w-8 h-8 text-cs-gold" />
                </div>
                <h2 className="text-xl font-bold text-cs-white mb-2">
                  Conteúdo Premium
                </h2>
                <p className="text-sm text-cs-white-muted mb-6 max-w-sm mx-auto">
                  Esta aula está disponível apenas para quem adquiriu o {course.title}.
                  Experimente gratuitamente as aulas marcadas como "Grátis".
                </p>
                <button
                  onClick={() => setShowUpsell(true)}
                  className="inline-flex items-center gap-2 bg-cs-gold hover:bg-cs-gold-hover text-cs-black font-bold px-7 py-3 rounded-xl transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Desbloquear {course.title} — {course.price}
                </button>
              </div>
            </div>
          </div>
        </div>

        {showUpsell && (
          <UpsellModal course={course} onClose={() => setShowUpsell(false)} />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back nav */}
      <div className="flex items-center gap-3">
        <Link
          href={`/cursos/${course.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-cs-white-muted hover:text-cs-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {course.title}
        </Link>
        <span className="text-cs-border">·</span>
        <span className="text-sm text-cs-white-dim truncate">
          {currentModule?.title}
        </span>
        {lesson.is_free && (
          <span className="text-xs font-semibold text-cs-gold border border-cs-gold/30 bg-cs-gold-dim px-2 py-0.5 rounded-full">
            Grátis
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="xl:col-span-2 space-y-5">
          <VideoPlayer youtubeUrl={lesson.youtube_url} title={lesson.title} />

          {/* Lesson info */}
          <div className="bg-cs-black-surface border border-cs-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-lg font-bold text-cs-white mb-1">
                  {lesson.title}
                </h1>
                <div className="flex items-center gap-3 text-xs text-cs-white-dim">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {currentModule?.title}
                  </span>
                  <span>{formatDuration(lesson.duration_minutes)}</span>
                </div>
              </div>
              <Button
                variant={completed ? 'ghost' : 'gold'}
                size="sm"
                icon={<CheckCircle className="w-4 h-4" />}
                onClick={() => setCompleted(!completed)}
                className={completed ? 'text-green-400' : ''}
              >
                {completed ? 'Concluída' : 'Marcar como concluída'}
              </Button>
            </div>

            {lesson.description && (
              <div className="mt-4 pt-4 border-t border-cs-border">
                <p className="text-sm text-cs-white-muted leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            {prevLesson ? (
              <Link
                href={`/cursos/${course.slug}/${prevLesson.id}`}
                className="flex-1 flex items-center gap-3 bg-cs-black-surface border border-cs-border rounded-xl p-4 hover:border-cs-gold/30 transition-all group"
              >
                <ChevronLeft className="w-5 h-5 text-cs-white-muted group-hover:text-cs-gold flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-cs-white-dim">Aula anterior</p>
                  <p className="text-sm font-medium text-cs-white truncate">
                    {prevLesson.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextLesson && (
              <Link
                href={`/cursos/${course.slug}/${nextLesson.id}`}
                className="flex-1 flex items-center gap-3 bg-cs-black-surface border border-cs-border rounded-xl p-4 hover:border-cs-gold/30 transition-all group text-right justify-end"
              >
                <div className="min-w-0">
                  <p className="text-xs text-cs-white-dim">Próxima aula</p>
                  <p className="text-sm font-medium text-cs-white truncate">
                    {nextLesson.title}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-cs-white-muted group-hover:text-cs-gold flex-shrink-0" />
              </Link>
            )}
          </div>

          {/* Upsell banner for free users viewing free lessons */}
          {!MOCK_ENROLLED && lesson.is_free && (
            <div
              className="rounded-xl p-5 flex items-center gap-4"
              style={{
                background: 'linear-gradient(135deg, #141414, #1A1A0A)',
                border: '1px solid rgba(201, 164, 53, 0.2)',
              }}
            >
              <Sparkles className="w-5 h-5 text-cs-gold flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-cs-white">
                  Gostou? Acesse o curso completo.
                </p>
                <p className="text-xs text-cs-white-muted">
                  {course.title} completo por apenas {course.price}
                </p>
              </div>
              <button
                onClick={() => setShowUpsell(true)}
                className="flex-shrink-0 bg-cs-gold hover:bg-cs-gold-hover text-cs-black text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Quero acesso
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - course index */}
        <div className="xl:col-span-1">
          <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden sticky top-6">
            <div className="px-4 py-3 border-b border-cs-border">
              <h3 className="text-sm font-semibold text-cs-white">
                Conteúdo do curso
              </h3>
              <p className="text-xs text-cs-white-dim mt-0.5">{course.title}</p>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <div className="p-2 space-y-1.5">
                {course.modules?.map((module) => (
                  <ModuleAccordion
                    key={module.id}
                    module={module}
                    courseSlug={course.slug}
                    defaultOpen={module.id === lesson.module_id}
                    activeLessonId={lesson.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUpsell && (
        <UpsellModal course={course} onClose={() => setShowUpsell(false)} />
      )}
    </div>
  )
}
