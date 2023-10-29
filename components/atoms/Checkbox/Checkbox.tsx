import { cn } from '@/lib/utils'
import React from 'react'
import { FieldError } from 'react-hook-form'
import { ErrorMessage } from '../ErrorMessage'
import { CheckboxProps } from './Checkbox.types'

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, errors, className, label, ...rest }, ref) => {
    const error = name ? (errors?.[name] as FieldError) || undefined : undefined

    return (
      <div>
        <label
          htmlFor={name}
          className="text-[11px] lg:text-[12px] checked:bg-gray flex items-center"
        >
          <input
            type="checkbox"
            className={cn(
              className,
              'mr-2 rounded border border-borderMid w-4 h-4'
            )}
            id={name}
            name={name}
            ref={ref}
            {...rest}
          />
          {label}
        </label>
        {error && <ErrorMessage error={error} />}
      </div>
    )
  }
)

Checkbox.displayName = 'CheckboxField'
