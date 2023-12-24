'use client'

import { MinusIcon } from '@/icons'
import { TextField } from '@/components/atoms/TextField'
import { SalaryRangeProps } from './SalaryRange.types'
import { Controller, useFieldArray } from 'react-hook-form'
import { DropdownSelect } from '@/components/atoms/DropdownSelect'
import { cn } from '@/lib/utils'
import { ErrorMessage } from '@/components/atoms/ErrorMessage'

export const SalaryRange = ({
  control,
  register,
  contractTypes,
  formErrors,
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

  const canAddMore = fields.length < contractTypes.length

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex flex-wrap md:flex-nowrap gap-3 items-end">
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
                  options={contractTypes}
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

          <ErrorMessage
            error={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (formErrors?.salaryRange as any)?.contractType ||
              formErrors?.salaryRange?.[index]?.from ||
              formErrors?.salaryRange?.[index]?.to ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (formErrors?.salaryRange?.[index] as any)?.from_to
            }
          />
        </div>
      ))}
      {canAddMore && (
        <button type="button" onClick={handleAddClick} className="p-1 mr-auto">
          Add more
        </button>
      )}
    </>
  )
}
