'use client'

import { OfferCard } from '@/components/atoms/OfferCard'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { OfferPostedListProps } from '.'
import { OfferPostedActions } from './OfferPostedActions'

export const OfferPostedList = ({
  offers,
  className,
}: OfferPostedListProps) => {
  const [offerList] = useState(offers)

  const handleEditClick = () => {
    console.log('edit')
  }
  const handleDeleteClick = () => {
    console.log('delete')
  }
  const handleCadidatesClick = () => {
    console.log('candidates')
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {offerList.length !== 0 ? (
        offerList.map((offer) => (
          <ul key={offer.id} className="flex items-center gap-2 lg:gap-4">
            <OfferCard {...offer} />
            <OfferPostedActions
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onCandidatesClick={handleCadidatesClick}
            />
          </ul>
        ))
      ) : (
        <p>No offers</p>
      )}
    </div>
  )
}
