export type PostJobFormProps = {
  selectOptions: PostJobFormOptions
}

export type PostJobFormOptions = {
  operatingModes: SelectOption[]
  experiences: SelectOption[]
  typesOfWork: SelectOption[]
  techOptions: SelectOption[]
  contractTypes: SelectOption[]
}

export type SelectOption = {
  value: number
  label: string
}
