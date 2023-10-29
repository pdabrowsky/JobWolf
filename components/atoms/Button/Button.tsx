import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ButtonProps } from './Button.types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, children, onClick, className, ...rest }, ref) => (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'w-fit py-2 px-5 rounded-md bg-gold text-dark font-medium',
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
