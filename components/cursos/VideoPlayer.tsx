'use client'

import { getYouTubeEmbedUrl } from '@/lib/utils'

interface VideoPlayerProps {
  youtubeUrl: string
  title?: string
}

export default function VideoPlayer({ youtubeUrl, title }: VideoPlayerProps) {
  const embedUrl = getYouTubeEmbedUrl(youtubeUrl)

  return (
    <div className="w-full">
      <div
        className="relative w-full rounded-xl overflow-hidden bg-cs-black-surface border border-cs-border"
        style={{ paddingBottom: '56.25%' }}
      >
        <iframe
          src={embedUrl}
          title={title || 'Aula'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}
