import { FieldErrors } from 'react-hook-form'

export type DropdownSelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  options: DropdownSelectOption[]
  initialOption?: DropdownSelectOption
  onChange?: (value: number) => void
  label: string
  errors?: FieldErrors
  className?: string
}

export type DropdownSelectOption = {
  value: number
  label: string
}
