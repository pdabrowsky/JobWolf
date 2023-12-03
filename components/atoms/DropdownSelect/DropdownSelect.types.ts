import { FieldErrors } from 'react-hook-form'

export type DropdownSelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  options: DropdownSelectOption[]
  initialOption?: DropdownSelectOption
  onChange?: (value: string) => void
  label: string
  errors?: FieldErrors
  className?: string
}

export type DropdownSelectOption = {
  value: string
  label: string
}
