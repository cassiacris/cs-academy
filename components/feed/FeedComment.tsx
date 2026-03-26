import { FeedComment as FeedCommentType } from '@/types'
import { formatRelativeDate, getInitials } from '@/lib/utils'

interface FeedCommentProps {
  comment: FeedCommentType
}

export default function FeedComment({ comment }: FeedCommentProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-cs-black-subtle border border-cs-border flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-xs font-bold text-cs-white-muted">
          {getInitials(comment.user_name)}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-cs-black-subtle rounded-lg px-3 py-2.5">
          <p className="text-xs font-semibold text-cs-white mb-1">
            {comment.user_name}
          </p>
          <p className="text-sm text-cs-white-muted leading-relaxed">
            {comment.content}
          </p>
        </div>
        <p className="text-xs text-cs-white-dim mt-1 ml-3">
          {formatRelativeDate(comment.created_at)}
        </p>
      </div>
    </div>
  )
}
