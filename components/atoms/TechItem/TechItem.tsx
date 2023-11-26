'use client'

import React from 'react'
import { TechItemProps } from './TechItem.types'
import { cn } from '@/lib/utils'

export const TechItem = React.forwardRef<HTMLInputElement, TechItemProps>(
  ({ name, isSelected, onToggle, className }, ref) => {
    return (
      <label
        className={cn(
          'py-1 px-2 border transition-all cursor-pointer text-[14px] rounded-lg',
          {
            'text-gold border-gold': isSelected,
            'text-lightGray border-borderLight': !isSelected,
          },
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          name={name}
          checked={isSelected}
          className="sr-only"
          onChange={() => onToggle(name)}
        />
        <span>{name}</span>
      </label>
    )
  }
)

TechItem.displayName = 'TechItem'
