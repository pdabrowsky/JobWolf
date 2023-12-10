export type OfferApplySidebarProps = {
  salary: OfferApplySidebarSalary[]
  offerId: string
}

export type OfferApplySidebarSalary = {
  salaryFrom: number
  salaryTo: number
  contractType: string
}
