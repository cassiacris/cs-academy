import Link from 'next/link'
import { BookOpen, Clock, Play, CheckCircle } from 'lucide-react'
import { Course } from '@/types'
import { formatDuration } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const progress = course.progress || 0
  const completedLessons = Math.floor((progress / 100) * course.total_lessons)
  const isStarted = progress > 0
  const isCompleted = progress === 100

  return (
    <Link href={`/cursos/${course.slug}`} className="block group">
      <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden transition-all duration-300 hover:border-cs-gold/30 hover:shadow-gold hover:-translate-y-0.5">
        {/* Thumbnail / Gradient header */}
        <div className="relative h-44 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                course.slug === 'box-magnetize'
                  ? 'linear-gradient(135deg, #1A1A1A 0%, #3D2F0A 50%, #8B6F1E 100%)'
                  : 'linear-gradient(135deg, #0A1628 0%, #1A2440 50%, #1E3560 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{
                  background: 'rgba(201, 164, 53, 0.1)',
                  border: '1px solid rgba(201, 164, 53, 0.2)',
                }}
              >
                {course.slug === 'box-magnetize' ? (
                  <span className="text-2xl">✦</span>
                ) : (
                  <span className="text-2xl">◈</span>
                )}
              </div>
              <h3 className="text-sm font-bold text-cs-gold tracking-wide uppercase">
                {course.title}
              </h3>
            </div>
          </div>
          {/* Progress overlay */}
          {isStarted && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-cs-black-surface">
              <div
                className="h-full bg-cs-gold transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {isCompleted && (
            <div className="absolute top-3 right-3">
              <Badge variant="gold">
                <CheckCircle className="w-3 h-3" />
                Concluído
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-cs-white text-base mb-2 group-hover:text-cs-gold transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-cs-white-muted line-clamp-2 mb-4 leading-relaxed">
            {course.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-cs-white-dim mb-4">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {course.total_lessons} aulas
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(course.total_duration)}
            </span>
            {course.modules && (
              <span>{course.modules.length} módulos</span>
            )}
          </div>

          {/* Progress */}
          {isStarted && !isCompleted && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-cs-white-muted">
                  {completedLessons} de {course.total_lessons} aulas
                </span>
                <span className="text-xs text-cs-gold font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 bg-cs-black-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cs-gold to-cs-gold-hover rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: isStarted ? '#C9A435' : '#A89F8C' }}
          >
            <Play className="w-4 h-4 fill-current" />
            {isCompleted
              ? 'Rever curso'
              : isStarted
              ? 'Continuar'
              : 'Começar agora'}
          </div>
        </div>
      </div>
    </Link>
  )
}
