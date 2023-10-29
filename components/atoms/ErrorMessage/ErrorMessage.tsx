import { cn } from '@/lib/utils'
import { ArErrorMessageProps } from './ErrorMessage.types'

export const ErrorMessage = ({ className, error, id }: ArErrorMessageProps) => {
  let message = error?.message

  if (!message && error?.type === 'required') {
    message = 'This field is required'
  }

  return (
    <span
      role="alert"
      className={cn(
        className,
        'text-[11px] mt-[5px] text-red-500 focus:text-red-500 focus:font-normal'
      )}
      id={id}
    >
      {message}
    </span>
  )
}
