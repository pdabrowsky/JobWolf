import { CheckboxOption } from '@/components/molecules/CheckboxGroup'
import { TechSelectorOption } from '@/components/molecules/TechSelector/TechSelector.types'

export type SearchFiltersFormProps = {
  onClose: () => void
  filterOptions: FilterOptionsSet
}

export type FilterOptionsSet = {
  experience: CheckboxOption[]
  typeOfWork: CheckboxOption[]
  operatingMode: CheckboxOption[]
  contractType: CheckboxOption[]
  technology: TechSelectorOption[]
}
