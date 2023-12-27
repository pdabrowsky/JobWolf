'use client'

import { OfferCard } from '@/components/atoms/OfferCard'
import { OfferFavoriteListProps } from './OfferFavoriteList.types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { StarIcon } from '@/icons'
import { toast } from 'react-toastify'
import { toggleFavoriteOffer } from '@/app/actions/offer/toggleFavoriteOffer'

export const OfferFavoriteList = ({
  offers,
  className,
  candidateEmail,
}: OfferFavoriteListProps) => {
  const [offerList, setOfferList] = useState(offers)

  const handletoggleFavorite = async (offerId: string) => {
    setOfferList((currentOfferList) =>
      currentOfferList.filter((offer) => offer.id !== offerId)
    )
    const response = await toggleFavoriteOffer({
      offerId,
      candidateEmail,
    })
    if (response.type === 'error') {
      toast.error(response.msg)
    } else {
      toast.success(response.msg)
    }
  }

  return (
    <ul
      className={cn(
        'flex flex-col gap-4 w-full md:w-fit md:max-w-[800px]',
        className
      )}
    >
      {offerList.length !== 0 ? (
        offerList.map((offer) => (
          <li key={offer.id} className="flex items-center gap-2 lg:gap-4">
            <OfferCard {...offer} />
            <StarIcon
              className="w-6 h-6 lg:w-8 lg:h-8 text-gold fill-gold"
              role="button"
              onClick={() => handletoggleFavorite(offer.id)}
            />
          </li>
        ))
      ) : (
        <p>No offers</p>
      )}
    </ul>
  )
}
