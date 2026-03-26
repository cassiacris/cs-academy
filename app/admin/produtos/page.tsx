'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Image,
  ToggleLeft,
  ToggleRight,
  Loader2,
  AlertCircle,
  Brain,
  Sparkles,
  FileText,
} from 'lucide-react'
import { Course, CourseCategory } from '@/types'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

// ─── Labels ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  'mentalidade': 'Mentalidade',
  'negocios-femininos': 'Negócios Femininos',
  'solucoes-ferramentas': 'Soluções e Ferramentas',
}

const PRODUCT_TYPE_LABELS: Record<string, string> = {
  'curso': 'Curso',
  'meditacao': 'Meditação',
  'template': 'Template',
  'planilha': 'Planilha',
  'prompt': 'Prompt',
  'ebook': 'E-book',
}

const CATEGORY_COLORS: Record<string, string> = {
  'mentalidade': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'negocios-femininos': 'bg-cs-gold-dim text-cs-gold border-cs-gold/20',
  'solucoes-ferramentas': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'mentalidade': <Brain className="w-5 h-5 text-purple-400" />,
  'negocios-femininos': <Sparkles className="w-5 h-5 text-cs-gold" />,
  'solucoes-ferramentas': <FileText className="w-5 h-5 text-blue-400" />,
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ProductFormData = {
  title: string
  slug: string
  description: string
  category: CourseCategory | ''
  product_type: Course['product_type'] | ''
  price: string
  purchase_url: string
  thumbnail_url: string
  is_free: boolean
  has_free_preview: boolean
  total_lessons: number
  total_duration: number
}

const EMPTY_FORM: ProductFormData = {
  title: '',
  slug: '',
  description: '',
  category: '',
  product_type: '',
  price: '',
  purchase_url: '',
  thumbnail_url: '',
  is_free: false,
  has_free_preview: false,
  total_lessons: 0,
  total_duration: 0,
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// ─── Form Panel ───────────────────────────────────────────────────────────────

function ProductFormPanel({
  open,
  onClose,
  onSave,
  editing,
  loading,
}: {
  open: boolean
  onClose: () => void
  onSave: (data: ProductFormData) => Promise<void>
  editing: Course | null
  loading: boolean
}) {
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        slug: editing.slug || '',
        description: editing.description || '',
        category: (editing.category as CourseCategory) || '',
        product_type: editing.product_type || '',
        price: editing.price || '',
        purchase_url: editing.purchase_url || '',
        thumbnail_url: editing.thumbnail_url || '',
        is_free: editing.is_free ?? false,
        has_free_preview: editing.has_free_preview ?? false,
        total_lessons: editing.total_lessons || 0,
        total_duration: editing.total_duration || 0,
      })
      setSlugManuallyEdited(true)
    } else {
      setForm(EMPTY_FORM)
      setSlugManuallyEdited(false)
    }
  }, [editing, open])

  const handleTitleChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugManuallyEdited ? f.slug : slugify(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(form)
  }

  const toggle = (field: 'is_free' | 'has_free_preview') => {
    setForm((f) => ({ ...f, [field]: !f[field] }))
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[520px] bg-cs-black border-l border-cs-border z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cs-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cs-gold-dim border border-cs-gold/20 flex items-center justify-center">
              <Package className="w-4 h-4 text-cs-gold" />
            </div>
            <div>
              <h2 className="text-base font-bold text-cs-white">
                {editing ? 'Editar produto' : 'Novo produto'}
              </h2>
              <p className="text-xs text-cs-white-muted">
                {editing ? `Editando: ${editing.title}` : 'Preencha os campos abaixo'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-cs-white hover:border-cs-gold/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Título */}
          <Input
            label="Título *"
            placeholder="Ex: Box Magnetize"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
              Slug (URL) *
            </label>
            <input
              className="w-full bg-cs-black-subtle border border-cs-border rounded-xl px-4 py-2.5 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors font-mono"
              placeholder="ex: box-magnetize"
              value={form.slug}
              onChange={(e) => {
                setSlugManuallyEdited(true)
                setForm((f) => ({ ...f, slug: e.target.value }))
              }}
              required
            />
            <p className="text-xs text-cs-white-dim mt-1">
              Gerado automaticamente. Não use espaços ou acentos.
            </p>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
              Descrição *
            </label>
            <textarea
              className="w-full bg-cs-black-subtle border border-cs-border rounded-xl px-4 py-2.5 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors resize-none"
              rows={3}
              placeholder="Descreva o produto de forma clara e atraente..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
            />
          </div>

          {/* Categoria + Tipo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
                Categoria *
              </label>
              <select
                className="w-full bg-cs-black-subtle border border-cs-border rounded-xl px-4 py-2.5 text-sm text-cs-white focus:outline-none focus:border-cs-gold transition-colors appearance-none cursor-pointer"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as CourseCategory }))}
                required
              >
                <option value="">Selecione</option>
                <option value="mentalidade">Mentalidade</option>
                <option value="negocios-femininos">Negócios Femininos</option>
                <option value="solucoes-ferramentas">Soluções e Ferramentas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
                Tipo *
              </label>
              <select
                className="w-full bg-cs-black-subtle border border-cs-border rounded-xl px-4 py-2.5 text-sm text-cs-white focus:outline-none focus:border-cs-gold transition-colors appearance-none cursor-pointer"
                value={form.product_type}
                onChange={(e) => setForm((f) => ({ ...f, product_type: e.target.value as Course['product_type'] }))}
                required
              >
                <option value="">Selecione</option>
                <option value="curso">Curso</option>
                <option value="meditacao">Meditação</option>
                <option value="template">Template</option>
                <option value="planilha">Planilha</option>
                <option value="prompt">Prompt</option>
                <option value="ebook">E-book</option>
              </select>
            </div>
          </div>

          {/* Preço + URL de compra */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preço"
              placeholder="R$ 97"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            />
            <Input
              label="URL de compra"
              placeholder="https://pay.hotmart.com/..."
              value={form.purchase_url}
              onChange={(e) => setForm((f) => ({ ...f, purchase_url: e.target.value }))}
            />
          </div>

          {/* Imagem de capa */}
          <div>
            <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
              <span className="flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5" />
                Imagem de capa (URL)
              </span>
            </label>
            <input
              className="w-full bg-cs-black-subtle border border-cs-border rounded-xl px-4 py-2.5 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors"
              placeholder="https://... (JPG, PNG, WebP — 800×450px)"
              value={form.thumbnail_url}
              onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))}
            />
            {form.thumbnail_url && (
              <div className="mt-2 w-full h-32 rounded-xl overflow-hidden border border-cs-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.thumbnail_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.parentElement!.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* Aulas + Duração */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
                Total de aulas
              </label>
              <input
                type="number"
                min={0}
                className="w-full bg-cs-black-subtle border border-cs-border rounded-xl px-4 py-2.5 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors"
                placeholder="0"
                value={form.total_lessons}
                onChange={(e) => setForm((f) => ({ ...f, total_lessons: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cs-white-muted mb-1.5">
                Duração total (min)
              </label>
              <input
                type="number"
                min={0}
                className="w-full bg-cs-black-subtle border border-cs-border rounded-xl px-4 py-2.5 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors"
                placeholder="0"
                value={form.total_duration}
                onChange={(e) => setForm((f) => ({ ...f, total_duration: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 p-4 rounded-xl bg-cs-black-subtle border border-cs-border">
            <h4 className="text-xs font-semibold text-cs-white-muted uppercase tracking-wider">
              Acesso
            </h4>
            <button
              type="button"
              onClick={() => toggle('is_free')}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-colors ${
                form.is_free
                  ? 'text-cs-gold border-cs-gold/30 bg-cs-gold-dim'
                  : 'text-cs-white-muted border-cs-border bg-cs-black'
              }`}
            >
              <span className="text-sm font-medium">Produto gratuito</span>
              {form.is_free ? (
                <ToggleRight className="w-5 h-5" />
              ) : (
                <ToggleLeft className="w-5 h-5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => toggle('has_free_preview')}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-colors ${
                form.has_free_preview
                  ? 'text-cs-gold border-cs-gold/30 bg-cs-gold-dim'
                  : 'text-cs-white-muted border-cs-border bg-cs-black'
              }`}
            >
              <span className="text-sm font-medium">Tem preview gratuito</span>
              {form.has_free_preview ? (
                <ToggleRight className="w-5 h-5" />
              ) : (
                <ToggleLeft className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cs-border flex items-center gap-3 flex-shrink-0 bg-cs-black">
          <Button
            variant="gold"
            icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            onClick={handleSubmit as unknown as React.MouseEventHandler}
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Salvando...' : editing ? 'Salvar alterações' : 'Criar produto'}
          </Button>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
        </div>
      </div>
    </>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Course
  onEdit: (p: Course) => void
  onDelete: (id: string) => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden hover:border-cs-gold/20 transition-all duration-200 group">
      <div className="flex items-start gap-4 p-4">
        {/* Thumbnail */}
        <div
          className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden border border-cs-border"
          style={{
            background: product.thumbnail_url
              ? undefined
              : product.category === 'mentalidade'
              ? 'linear-gradient(135deg, #1A0A2E, #2E1A4A)'
              : product.category === 'negocios-femininos'
              ? 'linear-gradient(135deg, #3D2F0A, #8B6F1E)'
              : 'linear-gradient(135deg, #0A1628, #1E3560)',
          }}
        >
          {product.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.thumbnail_url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl">
              {product.category === 'mentalidade' ? '✦' : product.category === 'negocios-femininos' ? '◈' : '◇'}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold text-cs-white leading-snug truncate">
              {product.title}
            </h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => onEdit(product)}
                className="w-7 h-7 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-cs-gold hover:border-cs-gold/30 transition-colors"
                title="Editar"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              {confirmDelete ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDelete(product.id)}
                    className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Confirmar exclusão"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="w-7 h-7 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-cs-white transition-colors"
                    title="Cancelar"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-7 h-7 rounded-lg bg-cs-black-subtle border border-cs-border flex items-center justify-center text-cs-white-muted hover:text-red-400 hover:border-red-500/30 transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {product.category && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  CATEGORY_COLORS[product.category] || 'bg-cs-black-subtle text-cs-white-muted border-cs-border'
                }`}
              >
                {CATEGORY_LABELS[product.category] || product.category}
              </span>
            )}
            {product.product_type && (
              <span className="text-xs text-cs-white-dim bg-cs-black-subtle border border-cs-border rounded-full px-2 py-0.5">
                {PRODUCT_TYPE_LABELS[product.product_type] || product.product_type}
              </span>
            )}
            {product.is_free && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                Grátis
              </span>
            )}
            {product.price && !product.is_free && (
              <span className="text-xs font-bold text-cs-gold">{product.price}</span>
            )}
          </div>

          {product.description && (
            <p className="text-xs text-cs-white-muted mt-1.5 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'mentalidade', label: 'Mentalidade' },
  { id: 'negocios-femininos', label: 'Negócios Femininos' },
  { id: 'solucoes-ferramentas', label: 'Soluções e Ferramentas' },
] as const

export default function AdminProdutosPage() {
  const [products, setProducts] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [editing, setEditing] = useState<Course | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/products')
      if (!res.ok) throw new Error('Erro ao carregar produtos')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleOpenCreate = () => {
    setEditing(null)
    setPanelOpen(true)
  }

  const handleOpenEdit = (product: Course) => {
    setEditing(product)
    setPanelOpen(true)
  }

  const handleClose = () => {
    setPanelOpen(false)
    setTimeout(() => setEditing(null), 300)
  }

  const handleSave = async (data: ProductFormData) => {
    setSaving(true)
    try {
      if (editing) {
        const res = await fetch(`/api/admin/products/${editing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Erro ao salvar')
        }
      } else {
        const id = crypto.randomUUID()
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, id }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Erro ao criar')
        }
      }
      await fetchProducts()
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar produto')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao excluir')
      }
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir produto')
    }
  }

  const getByCategory = (category: string) =>
    products.filter((p) => p.category === category)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cs-white">Produtos</h1>
          <p className="text-sm text-cs-white-muted mt-1">
            Gerencie todos os produtos da CS Academy — cursos, meditações e ferramentas.
          </p>
        </div>
        <Button
          variant="gold"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleOpenCreate}
        >
          Novo produto
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400/60 hover:text-red-400 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-cs-white-muted">
            <Loader2 className="w-5 h-5 animate-spin text-cs-gold" />
            <span className="text-sm">Carregando produtos...</span>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {SECTIONS.map((section) => {
            const sectionProducts = getByCategory(section.id)
            return (
              <div key={section.id} className="space-y-4">
                {/* Section header */}
                <div className="flex items-center gap-3 pb-3 border-b border-cs-border">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201, 164, 53, 0.08)', border: '1px solid rgba(201, 164, 53, 0.15)' }}
                  >
                    {CATEGORY_ICONS[section.id]}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-cs-white">{section.label}</h2>
                    <p className="text-xs text-cs-white-muted">
                      {sectionProducts.length} {sectionProducts.length === 1 ? 'produto' : 'produtos'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditing(null)
                      setPanelOpen(true)
                    }}
                    className="flex items-center gap-1.5 text-xs text-cs-white-muted hover:text-cs-gold border border-cs-border hover:border-cs-gold/30 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Adicionar
                  </button>
                </div>

                {/* Products grid */}
                {sectionProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 border border-dashed border-cs-border rounded-xl text-cs-white-dim">
                    <Package className="w-8 h-8 mb-3 opacity-40" />
                    <p className="text-sm font-medium">Nenhum produto nesta categoria</p>
                    <p className="text-xs mt-1 opacity-70">Clique em &quot;Novo produto&quot; para começar</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sectionProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleOpenEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Uncategorized */}
          {products.filter((p) => !p.category || !SECTIONS.find((s) => s.id === p.category)).length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-cs-border">
                <h2 className="text-base font-bold text-cs-white-muted">Sem categoria</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {products
                  .filter((p) => !p.category || !SECTIONS.find((s) => s.id === p.category))
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleOpenEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Panel */}
      <ProductFormPanel
        open={panelOpen}
        onClose={handleClose}
        onSave={handleSave}
        editing={editing}
        loading={saving}
      />
    </div>
  )
}
