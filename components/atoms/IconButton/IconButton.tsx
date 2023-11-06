import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { IconsButtonProps } from '.'

export const IconButton = forwardRef<HTMLButtonElement, IconsButtonProps>(
  (
    {
      type,
      disabled,
      onClick,
      'aria-label': ariaLabel,
      icon,
      className,
      ...rest
    },
    ref
  ) => (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center transition-all',
        'rounded p-1',
        {
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
      ref={ref}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {icon}
    </button>
  )
)

IconButton.displayName = 'Button'
