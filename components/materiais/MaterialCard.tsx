import { FileText, Video, Music, ExternalLink, Download } from 'lucide-react'
import { Material } from '@/types'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface MaterialCardProps {
  material: Material
}

const typeConfig = {
  pdf: {
    icon: FileText,
    label: 'PDF',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  video: {
    icon: Video,
    label: 'Vídeo',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  audio: {
    icon: Music,
    label: 'Áudio',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  link: {
    icon: ExternalLink,
    label: 'Link',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const config = typeConfig[material.type]
  const Icon = config.icon

  return (
    <div className="bg-cs-black-surface border border-cs-border rounded-xl p-5 flex flex-col gap-4 transition-all duration-200 hover:border-cs-border hover:shadow-card group card-hover">
      {/* Icon + type */}
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <Badge variant="muted">{material.category}</Badge>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-cs-white mb-1.5 group-hover:text-cs-gold transition-colors line-clamp-2">
          {material.title}
        </h3>
        <p className="text-xs text-cs-white-muted leading-relaxed line-clamp-2">
          {material.description}
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          icon={material.type === 'link' ? <ExternalLink className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
          onClick={() => window.open(material.file_url, '_blank')}
        >
          {material.type === 'link' ? 'Acessar' : material.type === 'video' ? 'Assistir' : 'Baixar'}
        </Button>
      </div>
    </div>
  )
}
