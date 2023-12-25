import { CheckboxOption } from '@/components/molecules/CheckboxGroup'
import { TechSelectorOption } from '@/components/molecules/TechSelector/TechSelector.types'

export type SearchFiltersFormProps = {
  onClose: () => void
  filterOptions: FilterOptionsSet
}

export type FilterOptionsSet = {
  experienceOptions: CheckboxOption[]
  typeOfWorkOptions: CheckboxOption[]
  operatingModeOptions: CheckboxOption[]
  contractTypeOptions: CheckboxOption[]
  technologyOptions: TechSelectorOption[]
}
