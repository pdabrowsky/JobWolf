import React from 'react'
import { SpinnerProps } from './Spinner.types'
import { cn } from '@/lib/utils'

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900',
          className
        )}
      ></div>
    </div>
  )
}
