import { OfferCardProps } from '@/components/atoms/OfferCard'

export type OfferPostedListProps = {
  offers: OffersType
  className?: string
  defaultHasNextPage?: boolean
  getOffers: (page: number) => Promise<OfferData>
}

export type OfferData = {
  offers: OffersType
  hasNextPage: boolean
}

export type OffersType = (OfferCardProps & { isOpen?: boolean })[]
