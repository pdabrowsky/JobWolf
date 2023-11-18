import { FieldErrors } from 'react-hook-form'

export type DropdownSelectProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
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
