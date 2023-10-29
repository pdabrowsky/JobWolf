import { FieldErrors } from 'react-hook-form'

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  errors?: FieldErrors
  className?: string
}
