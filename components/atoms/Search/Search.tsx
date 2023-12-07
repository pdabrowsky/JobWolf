'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useDebounce } from 'use-debounce'
import { useRouter } from 'next/navigation'
import { SearchProps } from './Search.types'
import { LoupeIcon } from '@/icons'

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, search, ...rest }, ref) => {
    const router = useRouter()
    const initialRender = useRef(true)

    const [text, setText] = useState(search || '')
    const [query] = useDebounce(text, 300)

    useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false
        return
      }

      if (!query) {
        router.push(`/`)
      } else {
        router.push(`/?search=${query}`)
      }
    }, [query, router])

    return (
      <div className={cn('relative w-full', className)}>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <LoupeIcon className=" absolute top-1/2 transform -translate-y-1/2 w-5 h-5 left-3 text-gray pointer-events-none" />
        <input
          className="bg-darkLight border border-borderMid text-gray pl-10 pr-1.5 py-1.5 text-[14px] lg:text-[16px] rounded-md outline-none placeholder:text-gray placeholder:text-opacity-30 focus:shadow-none focus:ring-0 hover:border-borderLight focus:border-borderLight transition-all w-full"
          id="search"
          name="search"
          ref={ref}
          autoComplete="off"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          {...rest}
        />
      </div>
    )
  }
)

Search.displayName = 'Search'
