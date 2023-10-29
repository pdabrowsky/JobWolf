'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export const Navbar = () => {
  const { data: session } = useSession()
  console.log('session', session)
  return (
    <div className="w-full bg-slate-400">
      <Link href="/"> Home </Link>
      {session ? (
        <>
          <Link href="/logout"> Logout </Link>
          <p> Logged in as {session.user?.email} </p>
        </>
      ) : (
        <>
          <Link href="/login"> Login </Link>
          <Link href="/register"> Register </Link>
        </>
      )}
    </div>
  )
}
