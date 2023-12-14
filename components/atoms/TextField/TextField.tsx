import React from 'react'
import { TextFieldProps } from '.'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, errors, className, label, labelClassName, ...rest }, ref) => {
    const error = name ? (errors?.[name] as FieldError) || undefined : undefined

    return (
      <div className="flex flex-col w-full">
        <label
          htmlFor={name}
          className={cn('pb-1 text-[12px] lg:text-[14px]', labelClassName)}
        >
          {label}
        </label>
        <input
          className={cn(
            'bg-darkLight border border-borderMid text-gray px-1.5 py-1.5 text-[14px] lg:text-[16px] rounded-md outline-none placeholder:text-gray placeholder:text-opacity-30 focus:shadow-none focus:ring-0 hover:border-borderLight focus:border-borderLight transition-all',
            className
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
