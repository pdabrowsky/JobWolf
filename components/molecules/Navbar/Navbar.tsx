'use client'
import { Button } from '@/components/atoms/Button'
import { DropdownMenu } from '@/components/atoms/Dropdown'
import { IconButton } from '@/components/atoms/IconButton'
import { Logo } from '@/components/atoms/Logo'
import { routes } from '@/constants/routes'
import { ProfileIcon } from '@/icons/ProfileIcon'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const loggedInOptions = [
  {
    label: 'Profile',
    href: routes.PROFILE,
  },
  {
    label: 'Logout',
    href: routes.LOGOUT,
  },
]

const loggedOutOptions = [
  { label: 'Candidate', href: routes.REGISTER_CANDIDATE },
  { label: 'Employer', href: routes.REGISTER_EMPLOYER },
]

export const Navbar = () => {
  const { data: session } = useSession()
  console.log('sesja', session)

  const dropdownOptions = session ? loggedInOptions : loggedOutOptions

  return (
    <nav className="flex items-center justify-between h-14 lg:h-16 w-full border-b border-darkLight px-5 lg:px-8">
      <Logo className="h-6 lg:h-7" />
      <ul className="flex items-center gap-5 lg:gap-8 text-[12px] lg:text-[14px] lg:mr-3">
        <li>
          <Link href="/">Offers</Link>
        </li>
        <li>
          <Link href="/post-job">Post a job</Link>
        </li>
        <li>
          <DropdownMenu options={dropdownOptions}>
            {session ? (
              <IconButton
                aria-label="dropdown menu"
                icon={<ProfileIcon className="w-8 h-8 text-gold" />}
              />
            ) : (
              <Button className="rounded-lg px-4 lg:px-5 py-1 lg:py-1.5">
                Login
              </Button>
            )}
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  )
}
