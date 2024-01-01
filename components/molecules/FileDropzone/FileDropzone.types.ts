import { DropzoneOptions } from 'react-dropzone'

export type DropzoneInputProps = {
  name: string
  label: string
  className?: string
  fileName?: string
  fileUrl?: string
  onChange?: (file?: File) => void | Promise<void>
  disabled?: boolean
  errorMessageForm?: string
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>
}
