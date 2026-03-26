import { MessageSquare } from 'lucide-react'
import { mockFeedPosts } from '@/lib/mock-data'
import FeedPost from '@/components/feed/FeedPost'

export default function FeedPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-cs-gold-dim border border-cs-gold/20 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-cs-gold" />
          </div>
          <h1 className="text-2xl font-bold text-cs-white">Comunidade</h1>
        </div>
        <p className="text-sm text-cs-white-muted">
          Reflexões, insights e atualizações da Cássia para você.
        </p>
      </div>

      {/* Pinned note */}
      <div
        className="rounded-xl p-4 border"
        style={{
          background: 'linear-gradient(135deg, #1A1A0A 0%, #3D2F0A 100%)',
          borderColor: 'rgba(201, 164, 53, 0.2)',
        }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-cs-gold flex items-center justify-center flex-shrink-0">
            <span className="text-cs-black font-black text-xs">C</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-cs-gold mb-1">
              ✦ Bem-vinda à Comunidade CS Academy
            </p>
            <p className="text-sm text-cs-white-muted leading-relaxed">
              Este é o espaço onde compartilho reflexões, insights e conteúdo
              exclusivo para você. Comente, interaja e, principalmente, se
              permita ser transformada pelo processo. Você não está sozinha.
            </p>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-5">
        {mockFeedPosts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>

      {/* Load more placeholder */}
      <div className="text-center py-4">
        <p className="text-sm text-cs-white-dim">
          Você está em dia com o feed ✦
        </p>
      </div>
    </div>
  )
}
