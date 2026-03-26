import { cn } from '@/lib/utils'
import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-cs-black-surface border border-cs-border rounded-xl p-6',
          glow && 'gold-border-glow',
          hover && 'card-hover cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
)

export const CardTitle = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-lg font-semibold text-cs-white', className)}
    {...props}
  >
    {children}
  </h3>
)

export const CardContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
)

export default Card
