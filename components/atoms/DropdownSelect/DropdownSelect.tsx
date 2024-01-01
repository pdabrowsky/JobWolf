import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FieldError } from 'react-hook-form'
import { DropdownSelectProps } from './DropdownSelect.types'
import { ErrorMessage } from '../ErrorMessage'
import { ArrowDownIcon } from '@/icons'

export const DropdownSelect = ({
  name,
  options,
  label,
  className,
  errors,
  onChange,
  placeholder,
  selectedOption,
  ...rest
}: DropdownSelectProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const selectedLabel =
    options.find((option) => option.value === selectedOption)?.label || ''

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsFocused(true)
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsFocused(false)
  }

  const handleSelect = (option: number) => {
    if (option === selectedOption) return
    onChange(option)
  }
  const error = name ? (errors?.[name] as FieldError) || undefined : undefined

  return (
    <div className={cn(className, 'relative w-full')}>
      <label htmlFor={name} className="block text-[12px] lg:text-[13px] pb-1">
        {label}
      </label>
      <div className="relative">
        <input
          readOnly
          id={name}
          name={name}
          value={selectedLabel || ''}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          className="cursor-pointer w-full bg-darkLight border border-borderMid text-gray px-1.5 py-1.5 text-[14px] lg:text-[16px] rounded-md placeholder:text-gray placeholder:text-opacity-30 hover:border-borderLight focus-visible:outline-none focus-visible:ring-0 focus-visible:border-borderLight"
          {...rest}
        />
        <ArrowDownIcon className=" h-6 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-borderLight" />
      </div>
      <AnimatePresence>
        {isFocused && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute mt-2 bg-darkLight rounded-md shadow-lg border border-borderLight z-10 w-full max-h-[140px] overflow-y-auto"
          >
            {options.map((option) => (
              <motion.li
                key={option.label}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.25, delay: 0.1 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                onClick={() => handleSelect(option.value)}
                className="block text-[12px] lg:text-[13px] px-4 py-2 hover:bg-hoverDark transition-all rounded-md cursor-pointer"
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {error && <ErrorMessage error={error} />}
    </div>
  )
}
