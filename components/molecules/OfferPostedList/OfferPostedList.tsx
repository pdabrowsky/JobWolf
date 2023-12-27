'use client'

import { OfferCard } from '@/components/atoms/OfferCard'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { OfferPostedListProps } from '.'
import { OfferPostedActions } from './OfferPostedActions'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'
import { updateOfferStatus } from '@/app/actions/offer/updateOfferStatus'
import { toast } from 'react-toastify'

export const OfferPostedList = ({
  offers,
  className,
}: OfferPostedListProps) => {
  const [offerList, setOfferList] = useState(offers)
  const router = useRouter()

  // const handleEditClick = (id: string) => {
  //   console.log('edit', id)
  // }
  const handleDeleteClick = async (id: string) => {
    const res = await updateOfferStatus(id, false)

    const originalOffers = [...offerList]
    const updatedOffers = offerList.map((offer) =>
      offer.id === id ? { ...offer, isOpen: false } : offer
    )
    setOfferList(updatedOffers)

    if (res.type === 'success') {
      toast.success(res.msg)
    } else {
      setOfferList(originalOffers)
      toast.error(res.msg)
    }
  }
  const handleCadidatesClick = (id: string) => {
    router.push(`${routes.OFFER_CANDIDATES}?offer=${id}`)
  }

  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {offerList.length !== 0 ? (
        offerList.map((offer) => (
          <li key={offer.id} className="flex items-center gap-2 lg:gap-4">
            <OfferCard
              {...offer}
              className={cn(!offer.isOpen && 'opacity-50')}
            />
            <OfferPostedActions
              id={offer.id}
              // onEditClick={handleEditClick}
              onDeleteClick={offer.isOpen ? handleDeleteClick : undefined}
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
