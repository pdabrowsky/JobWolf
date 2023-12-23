import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form'
import { PostJobFormInput } from '../PostJobForm'
import { SelectOption } from '../PostJobForm/PostJobForm.types'

export type SalaryRangeProps = {
  className?: string
  name: string
  control: Control<PostJobFormInput>
  register: UseFormRegister<PostJobFormInput>
  getValues: UseFormGetValues<PostJobFormInput>
  contractTypes: SelectOption[]
  formErrors?: FieldErrors
}
