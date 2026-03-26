'use client'

import { useState } from 'react'
import { Search, UserPlus, Mail, BookOpen, Calendar, MoreHorizontal } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const mockStudents = [
  {
    id: '1',
    name: 'Ana Paula Ferreira',
    email: 'ana.paula@email.com',
    courses: ['Box Magnetize'],
    joinDate: '2026-03-20',
    status: 'active',
    source: 'hotmart',
  },
  {
    id: '2',
    name: 'Fernanda Meirelles',
    email: 'fernanda.m@email.com',
    courses: ['Método PAV'],
    joinDate: '2026-03-18',
    status: 'active',
    source: 'hubla',
  },
  {
    id: '3',
    name: 'Mariana Santos',
    email: 'mariana.s@email.com',
    courses: ['Box Magnetize', 'Método PAV'],
    joinDate: '2026-03-15',
    status: 'active',
    source: 'manual',
  },
  {
    id: '4',
    name: 'Carla Monteiro',
    email: 'carla.m@email.com',
    courses: ['Box Magnetize'],
    joinDate: '2026-03-10',
    status: 'active',
    source: 'kiwify',
  },
  {
    id: '5',
    name: 'Juliana Ramos',
    email: 'juliana.r@email.com',
    courses: ['Método PAV'],
    joinDate: '2026-02-28',
    status: 'inactive',
    source: 'hotmart',
  },
]

const sourceLabels = {
  hotmart: 'Hotmart',
  hubla: 'Hubla',
  kiwify: 'Kiwify',
  manual: 'Manual',
}

export default function AdminAlunasPage() {
  const [search, setSearch] = useState('')
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    course: '',
  })

  const filtered = mockStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (d: string) =>
    new Intl.DateTimeFormat('pt-BR').format(new Date(d))

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cs-white">Alunas</h1>
          <p className="text-sm text-cs-white-muted mt-1">
            {mockStudents.length} alunas cadastradas na plataforma
          </p>
        </div>
        <Button
          variant="gold"
          size="sm"
          icon={<UserPlus className="w-4 h-4" />}
          onClick={() => setShowEnrollModal(true)}
        >
          Matricular aluna
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Buscar por nome ou e-mail..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon={<Search className="w-4 h-4" />}
      />

      {/* Table */}
      <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cs-border">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-cs-white-muted uppercase tracking-wide">
                  Aluna
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-cs-white-muted uppercase tracking-wide hidden md:table-cell">
                  Cursos
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-cs-white-muted uppercase tracking-wide hidden lg:table-cell">
                  Origem
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-cs-white-muted uppercase tracking-wide hidden lg:table-cell">
                  Data
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-cs-white-muted uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, index) => (
                <tr
                  key={student.id}
                  className={`border-b border-cs-border-subtle last:border-0 hover:bg-cs-black-subtle transition-colors`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cs-black-subtle border border-cs-border flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-cs-white-muted">
                          {student.name[0]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-cs-white truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-cs-white-dim truncate flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {student.courses.map((c) => (
                        <Badge key={c} variant="muted" className="text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <Badge variant="outline">
                      {sourceLabels[student.source as keyof typeof sourceLabels]}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-cs-white-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(student.joinDate)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant={student.status === 'active' ? 'green' : 'muted'}
                    >
                      {student.status === 'active' ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-cs-white-dim hover:text-cs-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual enrollment modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-cs-black-surface border border-cs-border rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-cs-white mb-1">
              Matricular aluna
            </h3>
            <p className="text-sm text-cs-white-muted mb-5">
              Adicione uma aluna manualmente à plataforma
            </p>

            <div className="space-y-4">
              <Input
                label="Nome completo"
                placeholder="Nome da aluna"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
              <Input
                label="E-mail"
                type="email"
                placeholder="email@exemplo.com"
                value={newStudent.email}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
              />
              <div>
                <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
                  Curso
                </label>
                <select
                  className="w-full bg-cs-black-subtle border border-cs-border rounded-lg px-4 py-2.5 text-sm text-cs-white focus:outline-none focus:border-cs-gold transition-colors"
                  value={newStudent.course}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, course: e.target.value })
                  }
                >
                  <option value="">Selecione um curso</option>
                  <option value="box-magnetize">Box Magnetize</option>
                  <option value="metodo-pav">Método PAV</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Button
                variant="gold"
                size="sm"
                className="flex-1"
                onClick={() => {
                  console.log('Enrolling', newStudent)
                  setShowEnrollModal(false)
                  setNewStudent({ name: '', email: '', course: '' })
                }}
              >
                Matricular
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEnrollModal(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
