'use client'

import { OfferCard, OfferCardProps } from '@/components/atoms/OfferCard'
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
  const [page, setPage] = useState(1)
  const inView = useInView(ref)

  const loadMoreMovies = useCallback(async () => {
    const next = page + 1
    const newOfferList = await getOffers(next)
    if (newOfferList?.length) {
      setPage(next)
      setOfferList((prev: OfferCardProps[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...newOfferList,
      ])
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
      <Spinner ref={ref} />
    </ul>
  )
}
