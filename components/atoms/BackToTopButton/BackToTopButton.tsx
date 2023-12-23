'use client'

import { ArrowDownIcon } from '@/icons'
import { throttle } from '@/lib/throttle'
import React, { useState, useEffect } from 'react'

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    const throttledHandleScroll = throttle(handleScroll, 100)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed z-10 right-7 bottom-7 lg:bottom-10 lg:right-10 cursor-pointer p-2 rounded-full bg-gray flex items-center justify-center"
      >
        <ArrowDownIcon className="w-6 h-6 rotate-180 text-black" />
      </button>
    )
  )
}
