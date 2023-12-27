import { OfferCardProps } from '@/components/atoms/OfferCard'

export type OfferPostedListProps = {
  offers: (OfferCardProps & { isOpen?: boolean })[]
  className?: string
  employerEmail: string
}
