import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const CloseIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function CloseIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgIcon>
    )
  }
)
