import React, { useState } from 'react'
import { TechItem } from '@/components/atoms/TechItem'
import { TechSelectorProps } from './TechSelector.types'
import { cn } from '@/lib/utils'

export const TechSelector = ({
  label,
  name,
  className,
  onChange,
  technologies,
}: TechSelectorProps & {
  onChange: (value: string[]) => void
  initialOption?: string[]
}) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])

  const handleSelect = (tech: string) => {
    const newSelectedTechs = selectedTechs.includes(tech)
      ? selectedTechs.filter((t) => t !== tech)
      : [...selectedTechs, tech]
    setSelectedTechs(newSelectedTechs)
    onChange(newSelectedTechs)
  }

  return (
    <div
      className={cn('flex flex-col', className)}
      role="group"
      aria-labelledby={name + '-label'}
    >
      <label id={name + '-label'} className="pb-1 text-[12px] lg:text-[14px]">
        {label}
      </label>
      <div className="flex gap-2 flex-wrap">
        {technologies.map((tech) => (
          <TechItem
            key={tech}
            name={tech}
            isSelected={selectedTechs.includes(tech)}
            onToggle={() => handleSelect(tech)}
          />
        ))}
      </div>
    </div>
  )
}
