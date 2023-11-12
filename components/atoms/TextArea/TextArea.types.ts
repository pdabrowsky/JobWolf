import { FieldErrors } from 'react-hook-form'

export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string
    errors?: FieldErrors
  }
