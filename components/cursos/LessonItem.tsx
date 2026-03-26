import Link from 'next/link'
import { Play, CheckCircle, Lock } from 'lucide-react'
import { Lesson } from '@/types'
import { cn, formatDuration } from '@/lib/utils'

interface LessonItemProps {
  lesson: Lesson
  courseSlug: string
  isActive?: boolean
  isEnrolled?: boolean
}

export default function LessonItem({
  lesson,
  courseSlug,
  isActive = false,
  isEnrolled = true,
}: LessonItemProps) {
  const isLocked = !isEnrolled && !lesson.is_free

  const content = (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
        isActive
          ? 'bg-cs-gold-dim border border-cs-gold/20'
          : isLocked
          ? 'opacity-60'
          : 'hover:bg-cs-black-subtle',
        isLocked && 'cursor-not-allowed'
      )}
    >
      {/* Status icon */}
      <div className="flex-shrink-0">
        {lesson.completed ? (
          <div className="w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
          </div>
        ) : isLocked ? (
          <div className="w-7 h-7 rounded-full bg-cs-black-subtle border border-cs-border flex items-center justify-center">
            <Lock className="w-3 h-3 text-cs-white-dim" />
          </div>
        ) : (
          <div
            className={cn(
              'w-7 h-7 rounded-full border flex items-center justify-center transition-colors',
              isActive
                ? 'bg-cs-gold border-cs-gold'
                : 'bg-cs-black-subtle border-cs-border group-hover:border-cs-gold/30'
            )}
          >
            <Play
              className={cn(
                'w-3 h-3 fill-current',
                isActive ? 'text-cs-black' : 'text-cs-white-dim'
              )}
            />
          </div>
        )}
      </div>

      {/* Title + duration */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm font-medium truncate leading-tight',
            isActive
              ? 'text-cs-gold'
              : lesson.completed
              ? 'text-cs-white-muted'
              : 'text-cs-white'
          )}
        >
          {lesson.title}
        </p>
        <p className="text-xs text-cs-white-dim mt-0.5">
          {formatDuration(lesson.duration_minutes)}
        </p>
      </div>

      {/* Badge */}
      {lesson.is_free && !lesson.completed && (
        <span className="flex-shrink-0 text-xs font-semibold text-cs-gold border border-cs-gold/30 bg-cs-gold-dim px-2 py-0.5 rounded-full">
          Grátis
        </span>
      )}
      {isLocked && (
        <span className="flex-shrink-0 text-xs text-cs-white-dim border border-cs-border px-2 py-0.5 rounded-full">
          Premium
        </span>
      )}
    </div>
  )

  if (isLocked) return <div>{content}</div>

  return (
    <Link href={`/cursos/${courseSlug}/${lesson.id}`}>
      {content}
    </Link>
  )
}
