'use client'
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

  return (
    <nav className="flex items-center justify-between h-14 lg:h-16 w-full border-b border-darkLight px-5 lg:px-8">
      <Logo className="h-6 lg:h-7" />
      <ul className="flex items-center gap-5 lg:gap-8 text-[12px] lg:text-[14px] lg:mr-3">
        <li>
          <Link href={routes.HOME}>Offers</Link>
        </li>
        <li>
          <Link href={routes.POST_JOB}>Post a job</Link>
        </li>
        <li>
          {session ? (
            <DropdownMenu options={dropdownOptions}>
              <IconButton
                aria-label="dropdown menu"
                icon={<ProfileIcon className="w-8 h-8 text-gold" />}
              />
            </DropdownMenu>
          ) : (
            <Link
              href={routes.LOGIN}
              className="rounded-lg px-4 lg:px-5 py-1.5 bg-gold text-dark text-[12px] lg:text-[14px] font-medium transition-all hover:bg-opacity-80"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
