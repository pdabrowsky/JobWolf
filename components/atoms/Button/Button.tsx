import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ButtonProps } from './Button.types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, disabled, children, onClick, className, ...rest }, ref) => (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'w-fit py-2 px-5 rounded-md bg-gold text-dark text-[14px] font-medium transition-all hover:bg-opacity-80',
        {
          'opacity-50': disabled,
        },
        className
      )}
      ref={ref}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
