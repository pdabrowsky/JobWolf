'use client'

import { MinusIcon } from '@/icons'
import { TextField } from '@/components/atoms/TextField'
import { SalaryRangeProps } from './SalaryRange.types'
import { Controller, useFieldArray } from 'react-hook-form'
import { DropdownSelect } from '@/components/atoms/DropdownSelect'
import { cn } from '@/lib/utils'

export const SalaryRange = ({
  control,
  register,
  contractTypes,
  getValues,
}: SalaryRangeProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'salaryRange',
  })

  const handleAddClick = () => {
    append({ from: 0, to: 0, contractType: 1 })
  }
  const handleRemoveClick = (index: number) => {
    if (fields.length > 1) remove(index)
  }

  const getAvailableContractTypes = (currentIndex: number) => {
    const selectedTypes = getValues('salaryRange').map(
      (field) => field.contractType
    )
    return contractTypes.filter(
      (type) =>
        !selectedTypes.includes(type.value) ||
        type.value === selectedTypes[currentIndex]
    )
  }

  return (
    <>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-wrap md:flex-nowrap gap-3 items-end"
        >
          <TextField
            label="From"
            type="number"
            {...register(`salaryRange.${index}.from`, {
              setValueAs: (value) => (value === '' ? '' : Number(value)),
            })}
          />
          <TextField
            label="To"
            type="number"
            {...register(`salaryRange.${index}.to`, {
              setValueAs: (value) => (value === '' ? '' : Number(value)),
            })}
          />
          <Controller
            name={`salaryRange.${index}.contractType`}
            control={control}
            render={({ field }) => (
              <DropdownSelect
                label="Contract type"
                name={field.name}
                options={getAvailableContractTypes(index)}
                placeholder="Select contract type"
                onChange={(value) => field.onChange(value)}
              />
            )}
          />

          <button
            type="button"
            className={cn('md:mb-1 p-1', {
              'cursor-default': fields.length <= 1,
              'text-gold': fields.length > 1,
            })}
            disabled={fields.length <= 1}
            onClick={() => handleRemoveClick(index)}
          >
            <MinusIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddClick}
        className="md:mb-1 p-1 mr-auto text-gold"
      >
        Add more
      </button>
    </>
  )
}
