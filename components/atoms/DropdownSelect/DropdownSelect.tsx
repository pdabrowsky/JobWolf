import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FieldError } from 'react-hook-form'
import {
  DropdownSelectOption,
  DropdownSelectProps,
} from './DropdownSelect.types'
import { ErrorMessage } from '../ErrorMessage'

export const DropdownSelect = ({
  name,
  options,
  label,
  className,
  errors,
  onChange,
  placeholder,
  initialOption,
}: DropdownSelectProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [selectedOption, setSelectedOption] = useState(initialOption || null)
  const dropdownRef = useRef(null)

  const onFocus = (e) => {
    e.preventDefault()
    setIsFocused(true)
  }

  const onBlur = (e) => {
    e.preventDefault()
    setIsFocused(false)
  }

  const handleSelect = (option: DropdownSelectOption) => {
    if (option.value === selectedOption?.value) return
    onChange?.(option.value)
    setSelectedOption(option)
  }

  const error = name ? (errors?.[name] as FieldError) || undefined : undefined

  return (
    <div className={cn(className, 'relative w-fit')} ref={dropdownRef}>
      <label htmlFor={name} className="block text-[12px] lg:text-[13px] pb-1">
        {label}
      </label>
      <input
        readOnly
        value={selectedOption?.label || 'Select an option'}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className="cursor-pointer bg-darkLight border border-borderMid text-gray px-1.5 py-1.5 text-[14px] lg:text-[16px] rounded-md placeholder:text-gray placeholder:text-opacity-30 focus-visible:ring-0 focus-visible:border-borderLight"
      />
      <AnimatePresence>
        {isFocused && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute mt-2 bg-darkLight rounded-md shadow-lg border border-borderLight z-10 w-full"
          >
            {options.map((option) => (
              <motion.li
                key={option.value}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.25, delay: 0.1 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                onClick={() => handleSelect(option)}
                className="block text-[12px] lg:text-[13px] px-4 py-2 hover:bg-hoverDark transition-all rounded-md cursor-pointer"
              >
                {option.value}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {error && <ErrorMessage error={error} />}
    </div>
  )
}
