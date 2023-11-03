import { ReactNode } from 'react'

export type DropdownMenuOption = {
  label: string
  href: string
}

export type DropdownMenuProps = {
  options: DropdownMenuOption[]
  children: ReactNode
  className?: string
}
