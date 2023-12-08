import { FieldErrors } from 'react-hook-form'

export type TechSelectorProps = {
  name: string
  label: string
  className?: string
  onChange: (value: number[]) => void
  technologies: TechSelectorOption[]
  errors?: FieldErrors
}

export type TechSelectorOption = {
  value: number
  label: string
}
