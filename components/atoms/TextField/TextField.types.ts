import { FieldErrors } from 'react-hook-form'

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  errors?: FieldErrors
}
