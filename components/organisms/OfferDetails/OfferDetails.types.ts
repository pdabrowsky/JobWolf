export type OfferDetailsProps = {
  id: string
  title: string
  description: string
  city: string
  createdAt: Date
  updatedAt: Date
  isAddedToFavourites?: boolean
  employer: {
    id: string
    email: string
    name: string
    city: string
    address: string
    description: string
    phone: string
    website: string
    logoName: string
    logoUrl: string
  }
  experience: {
    id: number
    name: string
  }
  typeOfWork: {
    id: number
    name: string
  }
  operatingMode: {
    id: number
    name: string
  }
  mustHaveTech: {
    id: number
    name: string
  }[]
  niceToHaveTech: {
    id: number
    name: string
  }[]
}
