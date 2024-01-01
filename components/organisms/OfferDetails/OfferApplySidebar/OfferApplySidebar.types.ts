export type OfferApplySidebarProps = {
  salary: OfferApplySidebarSalary[]
  offerId: string
  hasApplied?: boolean
  isOpen?: boolean
  isProfileFilled?: boolean
}

export type OfferApplySidebarSalary = {
  salaryFrom: number
  salaryTo: number
  contractType: string
}
