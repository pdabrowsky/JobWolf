import { Card } from '@/components/atoms/Card'
import Link from 'next/link'
import { SidebarProps } from './Sidebar.types'
import { cn } from '@/lib/utils'
import { routes } from '@/constants/routes'
import { SettingsIcon, UserIcon } from '@/icons'

const navItems = [
  {
    name: 'Profile',
    href: routes.PROFILE,
    icon: <UserIcon className="h-6" />,
  },
  {
    name: 'Settings',
    href: routes.SETTINGS,
    icon: <SettingsIcon className="h-6" />,
  },
]

export const Sidebar = ({ activeTab }: SidebarProps) => {
  const isActive = (name: string) => activeTab === name.toLowerCase()

  return (
    <Card className="px-4 py-3 lg:py-5 w-fit">
      <nav>
        <ul className="flex justify-center lg:block">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={cn('transition-all w-fit', {
                'text-gold': isActive(item.name),
              })}
            >
              <Link
                href={item.href}
                className="flex items-center gap-2 py-3 px-4"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  )
}
