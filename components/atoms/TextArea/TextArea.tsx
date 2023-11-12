import React from 'react'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { TextAreaProps } from '.'

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, errors, className, label, ...rest }, ref) => {
    const error = name ? (errors?.[name] as FieldError) || undefined : undefined

    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="pb-1 text-[12px] lg:text-[14px]">
          {label}
        </label>
        <textarea
          className={cn(
            className,
            'bg-darkLight border  border-borderMid text-gray resize-none px-1.5 py-1.5 text-[14px] lg:text-[16px] rounded-md outline-none placeholder:text-gray placeholder:text-opacity-30 focus:shadow-none focus:ring-0 hover:border-borderLight focus:border-borderLight transition-all'
          )}
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
        {error && <ErrorMessage error={error} />}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
