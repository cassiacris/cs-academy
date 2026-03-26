'use client'

import { useState } from 'react'
import { Send, Trash2, Heart, MessageCircle, Image } from 'lucide-react'
import { mockFeedPosts } from '@/lib/mock-data'
import { formatRelativeDate } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function AdminFeedPage() {
  const [posts, setPosts] = useState(mockFeedPosts)
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const handlePublish = async () => {
    if (!content.trim()) return
    setPublishing(true)
    await new Promise((r) => setTimeout(r, 800))

    const newPost = {
      id: `p${Date.now()}`,
      content: content.trim(),
      image_url: imageUrl || undefined,
      created_at: new Date().toISOString(),
      author_name: 'Cássia Souza',
      likes_count: 0,
      liked_by_user: false,
      comments: [],
    }

    setPosts([newPost, ...posts])
    setContent('')
    setImageUrl('')
    setShowImageInput(false)
    setPublishing(false)
  }

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId))
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-cs-white">Gerenciar Feed</h1>
        <p className="text-sm text-cs-white-muted mt-1">
          Publique conteúdo exclusivo para a comunidade CS Academy
        </p>
      </div>

      {/* New post form */}
      <div
        className="rounded-xl p-5 border"
        style={{
          background: 'linear-gradient(135deg, #141414 0%, #1A1A0A 100%)',
          borderColor: 'rgba(201, 164, 53, 0.2)',
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-cs-gold flex items-center justify-center">
            <span className="text-cs-black font-black text-sm">C</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-cs-white">Cássia Souza</p>
            <p className="text-xs text-cs-gold">Publicar para a comunidade</p>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="O que você quer compartilhar com suas alunas hoje?&#10;&#10;Use Shift+Enter para quebrar linha..."
          rows={5}
          className="w-full bg-cs-black border border-cs-border rounded-xl px-4 py-3 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold focus:ring-1 focus:ring-cs-gold/20 transition-all resize-none mb-3"
        />

        {showImageInput && (
          <div className="mb-3">
            <input
              type="url"
              placeholder="URL da imagem (opcional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-cs-black border border-cs-border rounded-lg px-4 py-2.5 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold transition-colors"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowImageInput(!showImageInput)}
            className="flex items-center gap-1.5 text-xs text-cs-white-muted hover:text-cs-gold transition-colors"
          >
            <Image className="w-4 h-4" />
            {showImageInput ? 'Remover imagem' : 'Adicionar imagem'}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-cs-white-dim">
              {content.length} caracteres
            </span>
            <Button
              variant="gold"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
              loading={publishing}
              onClick={handlePublish}
              disabled={!content.trim()}
            >
              Publicar
            </Button>
          </div>
        </div>
      </div>

      {/* Posts list */}
      <div>
        <h2 className="text-sm font-semibold text-cs-white-muted uppercase tracking-wider mb-4">
          Posts publicados ({posts.length})
        </h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cs-gold flex items-center justify-center">
                      <span className="text-cs-black font-black text-xs">C</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cs-white">
                        {post.author_name}
                      </p>
                      <p className="text-xs text-cs-white-dim">
                        {formatRelativeDate(post.created_at)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 rounded-lg text-cs-white-dim hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-sm text-cs-white-muted leading-relaxed whitespace-pre-line line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-cs-border-subtle">
                  <span className="text-xs text-cs-white-dim flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes_count} curtidas
                  </span>
                  <span className="text-xs text-cs-white-dim flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments.length} comentários
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
