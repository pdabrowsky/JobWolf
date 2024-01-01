export type OfferCardProps = {
  id: string
  title: string
  technologies: string[]
  companyName: string
  salaryRange?: salaryRange
  employerLogoUrl: string
  isFavorite?: boolean
  isPostedByMe?: boolean
  className?: string
}

type salaryRange = {
  salaryFrom: number
  salaryTo: number
  contractTypeName: string
}
