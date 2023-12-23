import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const MinusIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function MinusIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M18 12L6 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </SvgIcon>
    )
  }
)
