import React, { useState } from 'react'
import { TechItem } from '@/components/atoms/TechItem'
import { TechSelectorProps } from './TechSelector.types'
import { cn } from '@/lib/utils'
import { FieldError } from 'react-hook-form'
import { ErrorMessage } from '@/components/atoms/ErrorMessage'

export const TechSelector = ({
  label,
  name,
  className,
  onChange,
  technologies,
  errors,
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

  const error = name ? (errors?.[name] as FieldError) || undefined : undefined

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
            key={tech.value}
            name={tech.label}
            isSelected={selectedTechs.includes(tech.value)}
            onToggle={() => handleSelect(tech.value)}
          />
        ))}
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  )
}
