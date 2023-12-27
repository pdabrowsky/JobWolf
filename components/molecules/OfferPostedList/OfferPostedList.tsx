'use client'

import { OfferCard } from '@/components/atoms/OfferCard'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { OfferPostedListProps } from '.'
import { OfferPostedActions } from './OfferPostedActions'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'

export const OfferPostedList = ({
  offers,
  className,
}: OfferPostedListProps) => {
  const [offerList] = useState(offers)
  const router = useRouter()

  const handleEditClick = (id: string) => {
    console.log('edit', id)
  }
  const handleDeleteClick = (id: string) => {
    console.log('delete', id)
  }
  const handleCadidatesClick = (id: string) => {
    console.log('candidates')
    router.push(`${routes.OFFER_CANDIDATES}?offer=${id}`)
  }

  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {offerList.length !== 0 ? (
        offerList.map((offer) => (
          <li key={offer.id} className="flex items-center gap-2 lg:gap-4">
            <OfferCard {...offer} />
            <OfferPostedActions
              id={offer.id}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onCandidatesClick={handleCadidatesClick}
            />
          </li>
        ))
      ) : (
        <p>No offers</p>
      )}
    </ul>
  )
}
