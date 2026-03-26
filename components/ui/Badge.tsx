import { cn } from '@/lib/utils'
import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'green' | 'red' | 'muted' | 'outline'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'muted', children, ...props }, ref) => {
    const variants = {
      gold: 'bg-cs-gold-dim text-cs-gold border border-cs-gold/30',
      green: 'bg-green-500/10 text-green-400 border border-green-500/20',
      red: 'bg-red-500/10 text-red-400 border border-red-500/20',
      muted: 'bg-cs-black-subtle text-cs-white-muted border border-cs-border',
      outline: 'bg-transparent text-cs-white-muted border border-cs-border',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
