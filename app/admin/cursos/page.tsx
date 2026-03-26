'use client'

import { useState } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Clock,
  ExternalLink,
  Image,
  Check,
  X,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import { mockCourses } from '@/lib/mock-data'
import { Course, Lesson } from '@/types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { formatDuration } from '@/lib/utils'

export default function AdminCursosPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [expandedCourse, setExpandedCourse] = useState<string | null>('1')
  const [expandedModule, setExpandedModule] = useState<string | null>('m1')
  const [showAddLesson, setShowAddLesson] = useState<string | null>(null)
  const [editingLesson, setEditingLesson] = useState<string | null>(null)
  const [editingCoverCourse, setEditingCoverCourse] = useState<string | null>(null)
  const [newLesson, setNewLesson] = useState({
    title: '',
    youtube_url: '',
    duration_minutes: '',
    description: '',
    is_free: false,
  })
  const [tempCoverUrl, setTempCoverUrl] = useState('')

  const handleAddLesson = (moduleId: string) => {
    if (!newLesson.title || !newLesson.youtube_url) return
    console.log('Adding lesson to module', moduleId, newLesson)
    setNewLesson({ title: '', youtube_url: '', duration_minutes: '', description: '', is_free: false })
    setShowAddLesson(null)
  }

  const handleSaveCover = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, thumbnail_url: tempCoverUrl } : c
      )
    )
    setEditingCoverCourse(null)
    setTempCoverUrl('')
  }

  const handleToggleFree = (courseId: string, moduleId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              modules: c.modules?.map((m) =>
                m.id === moduleId
                  ? {
                      ...m,
                      lessons: m.lessons.map((l) =>
                        l.id === lessonId ? { ...l, is_free: !l.is_free } : l
                      ),
                    }
                  : m
              ),
            }
          : c
      )
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-cs-white">Gerenciar Cursos</h1>
        <p className="text-sm text-cs-white-muted mt-1">
          Edite capa, módulos e aulas. Defina quais aulas são gratuitas.
        </p>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden"
          >
            {/* Course header */}
            <div className="flex items-center gap-4 p-5">
              {/* Thumbnail */}
              <div
                className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden relative group"
                style={{
                  background: course.thumbnail_url
                    ? undefined
                    : course.slug === 'box-magnetize'
                    ? 'linear-gradient(135deg, #3D2F0A, #8B6F1E)'
                    : 'linear-gradient(135deg, #0A1628, #1E3560)',
                }}
              >
                {course.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl">
                      {course.slug === 'box-magnetize' ? '✦' : '◈'}
                    </span>
                  </div>
                )}
                {/* Edit cover overlay */}
                <button
                  onClick={() => {
                    setEditingCoverCourse(course.id)
                    setTempCoverUrl(course.thumbnail_url || '')
                  }}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <Image className="w-4 h-4 text-cs-white" />
                </button>
              </div>

              <button
                onClick={() =>
                  setExpandedCourse(
                    expandedCourse === course.id ? null : course.id
                  )
                }
                className="flex-1 flex items-center gap-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-cs-white">
                    {course.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-cs-white-dim flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.modules?.length} módulos · {course.total_lessons} aulas
                    </span>
                    <span className="text-xs text-cs-white-dim flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(course.total_duration)}
                    </span>
                    {course.price && (
                      <span className="text-xs text-cs-gold font-semibold">
                        {course.price}
                      </span>
                    )}
                  </div>
                </div>
                {expandedCourse === course.id ? (
                  <ChevronUp className="w-4 h-4 text-cs-white-muted flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-cs-white-muted flex-shrink-0" />
                )}
              </button>

              {/* Edit cover button */}
              <button
                onClick={() => {
                  setEditingCoverCourse(course.id)
                  setTempCoverUrl(course.thumbnail_url || '')
                }}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs text-cs-white-muted hover:text-cs-gold transition-colors border border-cs-border hover:border-cs-gold/30 rounded-lg px-3 py-2"
              >
                <Image className="w-3.5 h-3.5" />
                Editar capa
              </button>
            </div>

            {/* Cover image editor */}
            {editingCoverCourse === course.id && (
              <div className="mx-4 mb-4 p-4 rounded-xl bg-cs-black border border-cs-gold/20 space-y-3">
                <h4 className="text-sm font-semibold text-cs-white flex items-center gap-2">
                  <Image className="w-4 h-4 text-cs-gold" />
                  Editar imagem de capa
                </h4>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      label="URL da imagem"
                      placeholder="https://... (JPG, PNG, WebP)"
                      value={tempCoverUrl}
                      onChange={(e) => setTempCoverUrl(e.target.value)}
                    />
                    <p className="text-xs text-cs-white-dim mt-1">
                      Cole a URL de uma imagem. Recomendado: 800×450px (proporção 16:9)
                    </p>
                  </div>
                  {tempCoverUrl && (
                    <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-cs-border mt-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tempCoverUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="gold"
                    size="sm"
                    icon={<Check className="w-3.5 h-3.5" />}
                    onClick={() => handleSaveCover(course.id)}
                  >
                    Salvar capa
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<X className="w-3.5 h-3.5" />}
                    onClick={() => {
                      setEditingCoverCourse(null)
                      setTempCoverUrl('')
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            {/* Modules list */}
            {expandedCourse === course.id && (
              <div className="border-t border-cs-border p-4 space-y-3 bg-cs-black">
                {course.modules?.map((module) => (
                  <div
                    key={module.id}
                    className="border border-cs-border rounded-xl overflow-hidden"
                  >
                    {/* Module header */}
                    <button
                      onClick={() =>
                        setExpandedModule(
                          expandedModule === module.id ? null : module.id
                        )
                      }
                      className="w-full flex items-center gap-3 px-4 py-3 text-left bg-cs-black-subtle hover:bg-cs-black transition-colors"
                    >
                      <span className="w-6 h-6 rounded bg-cs-gold-dim border border-cs-gold/20 text-xs text-cs-gold font-bold flex items-center justify-center">
                        {module.order}
                      </span>
                      <span className="flex-1 text-sm font-medium text-cs-white">
                        {module.title}
                      </span>
                      <span className="text-xs text-cs-white-dim">
                        {module.lessons.length} aulas
                      </span>
                      {expandedModule === module.id ? (
                        <ChevronUp className="w-3.5 h-3.5 text-cs-white-dim" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-cs-white-dim" />
                      )}
                    </button>

                    {/* Lessons list */}
                    {expandedModule === module.id && (
                      <div className="border-t border-cs-border bg-cs-black">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 px-4 py-3 border-b border-cs-border-subtle last:border-0"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-cs-white font-medium truncate">
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-3 mt-0.5">
                                <span className="text-xs text-cs-white-dim">
                                  {formatDuration(lesson.duration_minutes)}
                                </span>
                                <a
                                  href={lesson.youtube_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-cs-gold hover:text-cs-gold-hover flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  YouTube
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Toggle grátis */}
                              <button
                                onClick={() =>
                                  handleToggleFree(course.id, module.id, lesson.id)
                                }
                                className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                                  lesson.is_free
                                    ? 'text-cs-gold border-cs-gold/30 bg-cs-gold-dim'
                                    : 'text-cs-white-dim border-cs-border bg-cs-black-subtle'
                                }`}
                                title="Alternar acesso gratuito"
                              >
                                {lesson.is_free ? (
                                  <ToggleRight className="w-3.5 h-3.5" />
                                ) : (
                                  <ToggleLeft className="w-3.5 h-3.5" />
                                )}
                                Grátis
                              </button>
                              <button className="w-7 h-7 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-cs-gold hover:border-cs-gold/30 transition-colors">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button className="w-7 h-7 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-red-400 hover:border-red-500/30 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add lesson form */}
                        {showAddLesson === module.id ? (
                          <div className="p-4 space-y-3 border-t border-cs-border bg-cs-black-subtle">
                            <h4 className="text-sm font-medium text-cs-white">
                              Nova aula
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Input
                                label="Título da aula"
                                placeholder="Ex: Reprogramação: Autoimagem"
                                value={newLesson.title}
                                onChange={(e) =>
                                  setNewLesson({ ...newLesson, title: e.target.value })
                                }
                              />
                              <Input
                                label="URL do YouTube"
                                placeholder="https://youtube.com/watch?v=..."
                                value={newLesson.youtube_url}
                                onChange={(e) =>
                                  setNewLesson({ ...newLesson, youtube_url: e.target.value })
                                }
                              />
                              <Input
                                label="Duração (minutos)"
                                type="number"
                                placeholder="Ex: 22"
                                value={newLesson.duration_minutes}
                                onChange={(e) =>
                                  setNewLesson({ ...newLesson, duration_minutes: e.target.value })
                                }
                              />
                              {/* Toggle is_free */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-cs-white-muted">
                                  Acesso
                                </label>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setNewLesson({ ...newLesson, is_free: !newLesson.is_free })
                                  }
                                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                                    newLesson.is_free
                                      ? 'text-cs-gold border-cs-gold/30 bg-cs-gold-dim'
                                      : 'text-cs-white-muted border-cs-border bg-cs-black'
                                  }`}
                                >
                                  {newLesson.is_free ? (
                                    <ToggleRight className="w-4 h-4" />
                                  ) : (
                                    <ToggleLeft className="w-4 h-4" />
                                  )}
                                  {newLesson.is_free ? 'Aula gratuita' : 'Aula premium'}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
                                Descrição
                              </label>
                              <textarea
                                className="w-full bg-cs-black border border-cs-border rounded-lg px-4 py-2.5 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors resize-none"
                                rows={3}
                                placeholder="Descrição da aula..."
                                value={newLesson.description}
                                onChange={(e) =>
                                  setNewLesson({ ...newLesson, description: e.target.value })
                                }
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="gold"
                                size="sm"
                                onClick={() => handleAddLesson(module.id)}
                              >
                                Salvar aula
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAddLesson(null)}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3">
                            <button
                              onClick={() => setShowAddLesson(module.id)}
                              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-cs-border text-xs text-cs-white-dim hover:text-cs-gold hover:border-cs-gold/30 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Adicionar aula
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
