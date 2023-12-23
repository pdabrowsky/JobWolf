'use client'

import { OfferCard } from '@/components/atoms/OfferCard'
import { OfferListProps } from './OfferList.types'
import { cn } from '@/lib/utils'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Spinner } from '@/components/atoms/Spinner'
import { useInView } from 'framer-motion'

export const OffersList = ({
  offers,
  className,
  getOffers,
}: OfferListProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offerList, setOfferList] = useState(offers)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [page, setPage] = useState(1)
  const inView = useInView(ref)

  const loadMoreMovies = useCallback(async () => {
    const next = page + 1
    const { hasNextPage, offers } = await getOffers(next)

    !hasNextPage && setHasNextPage(false)

    if (offers?.length) {
      setPage(next)
      setOfferList((prev) => [...(prev || []), ...offers])
    }
  }, [getOffers, page])

  useEffect(() => {
    if (inView.valueOf()) {
      loadMoreMovies()
    }
  }, [inView, loadMoreMovies])

  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {offerList.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}
      {hasNextPage ? (
        <Spinner ref={ref} />
      ) : (
        <p className="mx-auto py-5">No more offers</p>
      )}
    </ul>
  )
}
