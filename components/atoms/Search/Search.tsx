'use client'

import React, { useState, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchProps } from './Search.types'
import { LoupeIcon } from '@/icons'
import queryString from 'query-string'
import { cn } from '@/lib/utils'

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...rest }, ref) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [text, setText] = useState(searchParams.get('search') || '')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateQueryParams = useCallback(
      debounce((newValue) => {
        const parsedParams = queryString.parse(searchParams.toString())

        if (newValue) {
          parsedParams.search = newValue
        } else {
          delete parsedParams.search
        }

        const stringifiedParams = queryString.stringify(parsedParams)
        router.push(`?${stringifiedParams}`)
      }, 300),
      [router, searchParams]
    )

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
      updateQueryParams(e.target.value)
    }

    return (
      <div className={cn('relative w-full', className)}>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <LoupeIcon className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 left-3 text-gray pointer-events-none" />
        <input
          className="bg-darkLight border border-borderMid text-gray pl-10 pr-1.5 py-1.5 text-[14px] lg:text-[16px] rounded-md outline-none placeholder:text-gray placeholder:text-opacity-30 focus:shadow-none focus:ring-0 hover:border-borderLight focus:border-borderLight transition-all w-full"
          id="search"
          name="search"
          ref={ref}
          autoComplete="off"
          placeholder="Search"
          value={text}
          onChange={onSearch}
          {...rest}
        />
      </div>
    )
  }
)

Search.displayName = 'Search'
