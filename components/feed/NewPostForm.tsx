'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

interface NewPostFormProps {
  onSubmit: (content: string) => void
  isComment?: boolean
  placeholder?: string
}

export default function NewPostForm({
  onSubmit,
  isComment = false,
  placeholder,
}: NewPostFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onSubmit(content.trim())
    setContent('')
  }

  const defaultPlaceholder = isComment
    ? 'Escreva um comentário...'
    : 'Compartilhe algo com a comunidade...'

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          rows={isComment ? 1 : 3}
          className={`w-full bg-cs-black-subtle border border-cs-border rounded-xl px-4 py-3 text-sm text-cs-white placeholder:text-cs-white-dim focus:outline-none focus:border-cs-gold focus:ring-1 focus:ring-cs-gold/30 transition-all duration-200 resize-none ${
            isComment ? 'min-h-[40px]' : 'min-h-[80px]'
          }`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && isComment) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!content.trim()}
        className="w-9 h-9 rounded-xl bg-cs-gold flex items-center justify-center flex-shrink-0 hover:bg-cs-gold-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        <Send className="w-4 h-4 text-cs-black" />
      </button>
    </form>
  )
}
