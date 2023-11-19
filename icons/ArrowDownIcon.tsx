import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const ArrowDownIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function ArrowDownIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M18 9L12 15L6 9" stroke="currentColor" strokeWidth="2" />
      </SvgIcon>
    )
  }
)
