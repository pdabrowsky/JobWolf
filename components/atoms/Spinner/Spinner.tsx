import React, { forwardRef } from 'react'
import { SpinnerProps } from './Spinner.types'
import { cn } from '@/lib/utils'

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className="flex justify-center items-center"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div
          className={cn(
            'animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900',
            className
          )}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'
