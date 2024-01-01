'use client'

import { UserRole } from '@/app/actions/types'
import { DropdownMenu } from '@/components/atoms/Dropdown'
import { IconButton } from '@/components/atoms/IconButton'
import { Logo } from '@/components/atoms/Logo'
import { routes } from '@/constants/routes'
import { ProfileIcon } from '@/icons/ProfileIcon'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const dropdownOptions = [
  {
    label: 'Profile',
    href: routes.PROFILE,
  },
  {
    label: 'Logout',
    href: routes.LOGOUT,
  },
]

export const Navbar = () => {
  const { data: session } = useSession()
  const isEmployer = session?.user?.role === UserRole.Employer
  const isCandidate = session?.user?.role === UserRole.Candidate

  return (
    <nav className="flex items-center justify-between h-14 lg:h-16 w-full border-b border-darkLight px-3 md:px-5 lg:px-8">
      <Logo className="h-6 lg:h-7" />
      <ul className="flex items-center gap-4 md:gap-5 lg:gap-8 text-[13px] lg:text-[15px] lg:mr-3">
        <li>
          <Link href={routes.HOME}>Offers</Link>
        </li>
        {isEmployer && (
          <>
            <li>
              <Link href={routes.POST_JOB}>Post a job</Link>
            </li>
            <li>
              <Link href={routes.POSTED_OFFERS}>My offers</Link>
            </li>
          </>
        )}
        {isCandidate && (
          <li>
            <Link href={routes.FAVORITES}>Favorite offers</Link>
          </li>
        )}
        <li>
          {session ? (
            <DropdownMenu options={dropdownOptions}>
              <IconButton
                aria-label="dropdown menu"
                icon={
                  <ProfileIcon className="w-7 h-7 md:w-8 md:h-8 text-gold" />
                }
              />
            </DropdownMenu>
          ) : (
            <Link
              href={routes.LOGIN}
              className="rounded-lg px-4 lg:px-5 py-1.5 bg-gold text-dark text-[13px] lg:text-[15px] font-medium transition-all hover:bg-opacity-80"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
