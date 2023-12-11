import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const InfoIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function InfoIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z"
          fill="currentColor"
          stroke="currentColor"
        />
        <path d="M12 17V10" stroke="currentColor" strokeWidth="2" />
      </SvgIcon>
    )
  }
)
