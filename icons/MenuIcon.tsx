import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const MenuIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function MenuIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M5 7H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 17H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </SvgIcon>
    )
  }
)
