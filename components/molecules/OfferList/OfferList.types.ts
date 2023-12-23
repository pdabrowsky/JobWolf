import { OfferCardProps } from '@/components/atoms/OfferCard'

export type OfferListProps = {
  offers: OfferCardProps[]
  className?: string
  getOffers: GetOffersFunction
  defaultHasNextPage: boolean
}

type GetOffersFunction = (page: number) => Promise<{
  offers: OfferCardProps[]
  totalOffers: number
  hasNextPage: boolean
}>
