'use client'

import { useState } from 'react'
import { Plus, Trash2, FileText, Video, Music, ExternalLink, Upload } from 'lucide-react'
import { mockMaterials } from '@/lib/mock-data'
import { Material } from '@/types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'

const typeIcons = {
  pdf: FileText,
  video: Video,
  audio: Music,
  link: ExternalLink,
}

const typeColors = {
  pdf: 'text-red-400',
  video: 'text-blue-400',
  audio: 'text-purple-400',
  link: 'text-green-400',
}

export default function AdminMateriaisPage() {
  const [materials, setMaterials] = useState(mockMaterials)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    file_url: '',
    type: 'pdf' as Material['type'],
  })

  const handleSave = async () => {
    if (!form.title || !form.file_url) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))

    const newMaterial: Material = {
      id: `mat${Date.now()}`,
      ...form,
      created_at: new Date().toISOString(),
    }

    setMaterials([newMaterial, ...materials])
    setForm({ title: '', description: '', category: '', file_url: '', type: 'pdf' })
    setShowForm(false)
    setSaving(false)
  }

  const handleDelete = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cs-white">Gerenciar Materiais</h1>
          <p className="text-sm text-cs-white-muted mt-1">
            {materials.length} materiais disponíveis para as alunas
          </p>
        </div>
        <Button
          variant="gold"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setShowForm(!showForm)}
        >
          Novo material
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-cs-black-surface border border-cs-gold/20 rounded-xl p-5 space-y-4">
          <h3 className="text-base font-semibold text-cs-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-cs-gold" />
            Adicionar material
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Título"
              placeholder="Ex: Workbook — Identidade de Alto Valor"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Input
              label="Categoria"
              placeholder="Ex: Mentalidade, Estratégia, Instagram"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="URL do arquivo / link"
              placeholder="https://drive.google.com/..."
              value={form.file_url}
              onChange={(e) => setForm({ ...form, file_url: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
                Tipo
              </label>
              <select
                className="w-full bg-cs-black-subtle border border-cs-border rounded-lg px-4 py-2.5 text-sm text-cs-white focus:outline-none focus:border-cs-gold transition-colors"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as Material['type'] })
                }
              >
                <option value="pdf">PDF</option>
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
                <option value="link">Link</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
              Descrição
            </label>
            <textarea
              className="w-full bg-cs-black-subtle border border-cs-border rounded-lg px-4 py-2.5 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors resize-none"
              rows={3}
              placeholder="Breve descrição do material..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="gold"
              size="sm"
              loading={saving}
              onClick={handleSave}
            >
              Salvar material
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Materials table */}
      <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cs-border">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-cs-white-muted uppercase tracking-wide">
                  Material
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-cs-white-muted uppercase tracking-wide hidden md:table-cell">
                  Categoria
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-cs-white-muted uppercase tracking-wide">
                  Tipo
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => {
                const Icon = typeIcons[material.type]
                const color = typeColors[material.type]
                return (
                  <tr
                    key={material.id}
                    className="border-b border-cs-border-subtle last:border-0 hover:bg-cs-black-subtle transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}
                          style={{ background: 'rgba(255,255,255,0.05)' }}
                        >
                          <Icon className={`w-4 h-4 ${color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-cs-white truncate">
                            {material.title}
                          </p>
                          <p className="text-xs text-cs-white-dim truncate">
                            {material.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <Badge variant="muted">{material.category}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium uppercase ${color}`}>
                        {material.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <a
                          href={material.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-cs-gold hover:border-cs-gold/30 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="w-7 h-7 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-red-400 hover:border-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
