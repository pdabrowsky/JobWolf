import React from 'react'
import { TechItemCheckbox } from '@/components/atoms/TechItemCheckbox'
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
  selectedTechs,
}: TechSelectorProps & {
  onChange: (value: number[]) => void
  selectedTechs?: number[]
}) => {
  const handleSelect = (tech: number) => {
    const newSelectedTechs = selectedTechs?.includes(tech)
      ? selectedTechs.filter((t) => t !== tech)
      : [...(selectedTechs || []), tech]

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
          <TechItemCheckbox
            key={tech.value}
            name={tech.label}
            isSelected={selectedTechs?.includes(tech.value) || false}
            onToggle={() => handleSelect(tech.value)}
          />
        ))}
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  )
}
