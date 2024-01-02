'use client'

import { OfferCard } from '@/components/atoms/OfferCard'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { OfferPostedListProps } from '.'
import { OfferPostedActions } from './OfferPostedActions'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'
import { updateOfferStatus } from '@/app/actions/offer/employer/updateOfferStatus'
import { toast } from 'react-toastify'
import { Spinner } from '@/components/atoms/Spinner'
import { useInView } from 'framer-motion'

export const OfferPostedList = ({
  offers,
  className,
  getOffers,
  defaultHasNextPage,
}: OfferPostedListProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offerList, setOfferList] = useState(offers)
  const [hasNextPage, setHasNextPage] = useState(defaultHasNextPage)
  const [page, setPage] = useState(1)
  const isInView = useInView(ref)
  const router = useRouter()

  const loadMoreOffers = useCallback(async () => {
    const next = page + 1
    const { hasNextPage, offers: newOffers } = await getOffers(next)

    !hasNextPage && setHasNextPage(false)

    if (newOffers?.length) {
      setPage(next)
      setOfferList((prev) => [...prev, ...newOffers])
    }
  }, [getOffers, page])

  useEffect(() => {
    if (isInView && hasNextPage) {
      loadMoreOffers()
    }
  }, [hasNextPage, isInView, loadMoreOffers])

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
    <>
      <ul className={cn('flex flex-col gap-4 w-full lg:w-fit', className)}>
        {!!offerList.length && (
          <>
            {offerList.map((offer) => (
              <li key={offer.id} className="flex items-center gap-2 lg:gap-4">
                <OfferCard
                  {...offer}
                  className={cn(!offer.isOpen && 'opacity-60')}
                />
                <OfferPostedActions
                  id={offer.id}
                  onDeleteClick={offer.isOpen ? handleDeleteClick : undefined}
                  onCandidatesClick={handleCadidatesClick}
                />
              </li>
            ))}
          </>
        )}
      </ul>
      {hasNextPage && <Spinner ref={ref} />}
      {offerList.length === 0 && <p className="py-5 text-center">No offers</p>}
    </>
  )
}
