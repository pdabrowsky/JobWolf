'use client'

import React from 'react'
import { TechItemProps } from './TechItem.types'
import { cn } from '@/lib/utils'

export const TechItem = ({
  name,
  variant = 'gray',
  className,
}: TechItemProps) => {
  return (
    <span
      className={cn(
        'py-0.5 px-2 border text-[11px] lg:text-[13px] rounded-lg',
        {
          'text-gold border-gold': variant === 'gold',
          'text-gray border-gray': variant === 'gray',
        },
        className
      )}
    >
      {name}
    </span>
  )
}
