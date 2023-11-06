import type { ButtonHTMLAttributes } from 'react'

export type IconsButtonProps = {
  'aria-label': string
  icon: React.ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>
