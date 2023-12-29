import { useController } from 'react-hook-form'
import { Checkbox } from '@/components/atoms/Checkbox'
import { CheckboxGroupProps } from '.'

export const CheckboxGroup = ({
  name,
  label,
  options,
  control,
}: CheckboxGroupProps) => {
  const { field } = useController({ name, control })
  const currentValue = Array.isArray(field.value) ? field.value : []

  const handleChange = (optionValue: number, checked: boolean) => {
    const newValue = checked
      ? [...currentValue, optionValue]
      : currentValue.filter((v: number) => v !== optionValue)
    field.onChange(newValue)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] lg:text-[15px]">{label}</label>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={`${name}[${option.value}]`}
          label={option.label}
          checked={currentValue.includes(option.value)}
          onChange={(e) => handleChange(option.value, e.target.checked)}
        />
      ))}
    </div>
  )
}
