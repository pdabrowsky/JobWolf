import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { PostJobFormInput } from '../PostJobForm'
import { CheckboxOption } from '@/components/molecules/CheckboxGroup'

export type SalaryRangeProps = {
  className?: string
  name: string
  control: Control<PostJobFormInput>
  register: UseFormRegister<PostJobFormInput>
  contractTypes: CheckboxOption[]
  formErrors?: FieldErrors<PostJobFormInput>
}
