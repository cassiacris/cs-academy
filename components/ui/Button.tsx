'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'gold',
      size = 'md',
      loading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cs-gold disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      gold: 'bg-cs-gold text-cs-black hover:bg-cs-gold-hover active:scale-[0.98] shadow-gold hover:shadow-gold-lg',
      outline:
        'border border-cs-gold text-cs-gold bg-transparent hover:bg-cs-gold-dim active:scale-[0.98]',
      ghost:
        'text-cs-white-muted bg-transparent hover:text-cs-white hover:bg-cs-black-subtle active:scale-[0.98]',
      danger:
        'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 active:scale-[0.98]',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
