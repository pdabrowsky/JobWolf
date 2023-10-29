'use client'

import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export const Logout = () => {
  useEffect(() => {
    signOut({
      callbackUrl: '/',
      redirect: true,
    })
  }, [])

  return null
}
