import React from 'react'
import { TextFieldProps } from '.'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, errors, className, label, ...rest }, ref) => {
    const error = name ? (errors?.[name] as FieldError) || undefined : undefined

    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="pb-1 text-[14px]">
          {label}
        </label>
        <input
          className={cn(
            className,
            ' bg-darkLight border border-borderMid text-gray px-1.5 py-1.5 text-[16px] rounded-md outline-none placeholder:text-opacity-40 focus:shadow-none focus:ring-0 hover:border-borderLight focus:border-borderLight transition-all'
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

TextField.displayName = 'TextField'
