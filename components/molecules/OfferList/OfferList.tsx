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
  defaultHasNextPage,
}: OfferListProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offerList, setOfferList] = useState(offers)
  const [hasNextPage, setHasNextPage] = useState(defaultHasNextPage)
  const [page, setPage] = useState(1)
  const isInView = useInView(ref)

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
    if (isInView && hasNextPage) {
      loadMoreMovies()
    }
  }, [hasNextPage, isInView, loadMoreMovies])

  return (
    <>
      <ul className={cn('flex flex-col gap-4 pb-5', className)}>
        {offerList.map((offer) => (
          <li key={offer.id}>
            <OfferCard {...offer} />
          </li>
        ))}
      </ul>
      {hasNextPage && <Spinner ref={ref} />}
      {!hasNextPage && page > 1 && (
        <p className="text-center">No more offers</p>
      )}
    </>
  )
}
