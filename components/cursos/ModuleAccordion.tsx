'use client'

import { useState } from 'react'
import { ChevronDown, CheckCircle, BookOpen } from 'lucide-react'
import { Module } from '@/types'
import { cn, formatDuration } from '@/lib/utils'
import LessonItem from './LessonItem'

interface ModuleAccordionProps {
  module: Module
  courseSlug: string
  defaultOpen?: boolean
  activeLessonId?: string
}

export default function ModuleAccordion({
  module,
  courseSlug,
  defaultOpen = false,
  activeLessonId,
}: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const completedCount = module.lessons.filter((l) => l.completed).length
  const totalDuration = module.lessons.reduce(
    (acc, l) => acc + l.duration_minutes,
    0
  )
  const isModuleCompleted = completedCount === module.lessons.length

  return (
    <div className="border border-cs-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center gap-4 px-5 py-4 text-left transition-colors',
          isOpen
            ? 'bg-cs-black-subtle'
            : 'bg-cs-black-surface hover:bg-cs-black-subtle'
        )}
      >
        {/* Module number */}
        <div
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold',
            isModuleCompleted
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-cs-gold-dim border border-cs-gold/20 text-cs-gold'
          )}
        >
          {isModuleCompleted ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            module.order
          )}
        </div>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-cs-white">{module.title}</p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-cs-white-dim flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {module.lessons.length} aulas
            </span>
            <span className="text-xs text-cs-white-dim">
              {formatDuration(totalDuration)}
            </span>
            {completedCount > 0 && (
              <span className="text-xs text-cs-gold">
                {completedCount}/{module.lessons.length} concluídas
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          className={cn(
            'w-4 h-4 text-cs-white-dim transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="border-t border-cs-border bg-cs-black p-2 space-y-0.5">
          {module.lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              courseSlug={courseSlug}
              isActive={lesson.id === activeLessonId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
