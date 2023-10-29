import { cn } from '@/lib/utils'
import { CardProps } from './Card.types'

export const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-darkLight rounded-[8px] text-gray shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
