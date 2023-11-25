import { DropzoneOptions } from 'react-dropzone'

export type DropzoneInputProps = {
  name: string
  label: string
  className?: string
  fileName?: string
  fileUrl?: string
  onChange?: (file?: File) => void | Promise<void>
  disabled?: boolean
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>
}
