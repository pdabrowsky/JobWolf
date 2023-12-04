export type PostJobFormProps = {
  selectOptions: PostJobFormOptions
}

export type PostJobFormOptions = {
  operatingModes: SelectOption[]
  experiences: SelectOption[]
  typesOfWork: SelectOption[]
  techOptions: SelectOption[]
}

export type SelectOption = {
  value: number
  label: string
}
