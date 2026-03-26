import { BookOpen, Clock } from 'lucide-react'
import { mockCourses } from '@/lib/mock-data'
import CourseCard from '@/components/cursos/CourseCard'
import { formatDuration } from '@/lib/utils'

export default function CursosPage() {
  const totalLessons = mockCourses.reduce((acc, c) => acc + c.total_lessons, 0)
  const totalDuration = mockCourses.reduce(
    (acc, c) => acc + c.total_duration,
    0
  )

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-cs-white">Meus Cursos</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-cs-white-muted flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-cs-gold" />
            {mockCourses.length} cursos matriculados
          </span>
          <span className="text-sm text-cs-white-muted flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cs-gold" />
            {totalLessons} aulas · {formatDuration(totalDuration)} de conteúdo
          </span>
        </div>
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {mockCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Upgrade prompt */}
      <div
        className="rounded-xl border p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        style={{
          background: 'linear-gradient(135deg, #141414 0%, #1A0A1A 100%)',
          borderColor: 'rgba(201, 164, 53, 0.15)',
        }}
      >
        <div className="w-12 h-12 rounded-xl bg-cs-gold-dim border border-cs-gold/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">✦</span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-base font-semibold text-cs-white">
            Protocolo RECODE — Transformação Profunda
          </h3>
          <p className="text-sm text-cs-white-muted mt-1">
            8 a 12 sessões individuais de Hipnoterapia e Análise com a Cássia.
            Reprogramação completa da mente e do emocional.
          </p>
        </div>
        <a
          href="https://wa.me/5548999888464"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cs-gold text-cs-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-cs-gold-hover transition-colors whitespace-nowrap flex-shrink-0"
        >
          Quero saber mais
        </a>
      </div>
    </div>
  )
}
