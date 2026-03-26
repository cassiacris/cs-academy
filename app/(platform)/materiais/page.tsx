'use client'

import { useState } from 'react'
import { FolderOpen } from 'lucide-react'
import { mockMaterials } from '@/lib/mock-data'
import MaterialCard from '@/components/materiais/MaterialCard'

const categories = ['Todos', 'Mentalidade', 'Estratégia', 'Reprogramação', 'Instagram']

export default function MateriaisPage() {
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filtered =
    activeCategory === 'Todos'
      ? mockMaterials
      : mockMaterials.filter((m) => m.category === activeCategory)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-cs-gold-dim border border-cs-gold/20 flex items-center justify-center">
            <FolderOpen className="w-4 h-4 text-cs-gold" />
          </div>
          <h1 className="text-2xl font-bold text-cs-white">Materiais</h1>
        </div>
        <p className="text-sm text-cs-white-muted">
          Recursos exclusivos para complementar sua jornada de transformação.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-cs-gold text-cs-black'
                : 'bg-cs-black-surface border border-cs-border text-cs-white-muted hover:text-cs-white hover:border-cs-gold/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-cs-white-dim">
        {filtered.length} material{filtered.length !== 1 ? 'is' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-cs-white-muted">
            Nenhum material nesta categoria ainda.
          </p>
        </div>
      )}
    </div>
  )
}
