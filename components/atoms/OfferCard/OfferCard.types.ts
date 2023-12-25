export type OfferCardProps = {
  id: string
  title: string
  technologies: string[]
  companyName: string
  salaryRange?: salaryRange
  employerLogoUrl: string
  isFavorite?: boolean
}

type salaryRange = {
  salaryFrom: number
  salaryTo: number
  contractTypeName: string
}
