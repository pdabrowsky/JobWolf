import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const LoupeIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function LoupeIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="11" cy="11" r="7" stroke="currectColor" strokeWidth="2" />
        <path
          d="M20 20L17 17"
          stroke="currectColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </SvgIcon>
    )
  }
)
