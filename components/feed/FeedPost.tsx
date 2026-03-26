'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { FeedPost as FeedPostType } from '@/types'
import { formatRelativeDate } from '@/lib/utils'
import FeedComment from './FeedComment'
import NewCommentForm from './NewPostForm'

interface FeedPostProps {
  post: FeedPostType
}

export default function FeedPost({ post }: FeedPostProps) {
  const [liked, setLiked] = useState(post.liked_by_user || false)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(post.comments)

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikesCount((prev) => prev - 1)
    } else {
      setLiked(true)
      setLikesCount((prev) => prev + 1)
    }
  }

  const handleNewComment = (content: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      post_id: post.id,
      user_id: 'current-user',
      content,
      created_at: new Date().toISOString(),
      user_name: 'Você',
    }
    setComments((prev) => [...prev, newComment])
  }

  return (
    <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden">
      {/* Author header */}
      <div className="flex items-center gap-3 p-5 pb-4">
        <div className="w-10 h-10 rounded-full bg-cs-gold flex items-center justify-center flex-shrink-0">
          <span className="text-cs-black font-black text-sm">C</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-cs-white">{post.author_name}</p>
          <p className="text-xs text-cs-white-dim">
            {formatRelativeDate(post.created_at)}
          </p>
        </div>
        <div className="ml-auto">
          <span className="text-xs bg-cs-gold-dim text-cs-gold border border-cs-gold/20 px-2 py-0.5 rounded-full">
            Mentora
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-4">
        <p className="text-sm text-cs-white leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.image_url && (
        <div className="px-5 pb-4">
          <img
            src={post.image_url}
            alt="Imagem do post"
            className="w-full rounded-lg object-cover max-h-80"
          />
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-cs-border" />

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 py-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            liked
              ? 'text-red-400 bg-red-500/10'
              : 'text-cs-white-muted hover:text-red-400 hover:bg-red-500/10'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${liked ? 'fill-current' : ''}`}
          />
          <span>{likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-cs-white-muted hover:text-cs-white hover:bg-cs-black-subtle transition-all duration-200"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{comments.length}</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-cs-white-muted hover:text-cs-white hover:bg-cs-black-subtle transition-all duration-200 ml-auto">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Comments section */}
      {(showComments || comments.length > 0) && (
        <div className="border-t border-cs-border px-5 py-4 space-y-4 bg-cs-black">
          {comments.map((comment) => (
            <FeedComment key={comment.id} comment={comment} />
          ))}

          <NewCommentForm onSubmit={handleNewComment} isComment />
        </div>
      )}
    </div>
  )
}
