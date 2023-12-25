import { Control } from 'react-hook-form'

export type CheckboxGroupProps = {
  name: string
  label: string
  options: CheckboxOption[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}

type CheckboxOption = {
  value: number
  label: string
}
