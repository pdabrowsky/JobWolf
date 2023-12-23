import { OfferCardProps } from '@/components/atoms/OfferCard'

export type OfferListProps = {
  offers: OfferCardProps[]
  className?: string
  search?: string
  getOffers: GetOffersFunction
}

type GetOffersFunction = (page: number) => Promise<OfferCardProps[]>
