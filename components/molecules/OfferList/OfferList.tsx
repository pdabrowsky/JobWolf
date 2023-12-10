import { OfferCard } from '@/components/atoms/OfferCard'
import { OfferListProps } from './OfferList.types'
import { cn } from '@/lib/utils'

export const OffersList = ({ offers, className }: OfferListProps) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {offers.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}
    </div>
  )
}
