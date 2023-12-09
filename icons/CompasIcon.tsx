import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const CompasIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function CompasIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M18.5397 7.7619L17.7046 12.7726C17.2831 15.3014 15.3014 17.2831 12.7726 17.7046L7.7619 18.5397C6.40826 18.7653 5.23471 17.5917 5.46032 16.2381L6.29543 11.2274C6.71691 8.69856 8.69856 6.71691 11.2274 6.29543L16.2381 5.46032C17.5917 5.23471 18.7653 6.40826 18.5397 7.7619Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="12"
          cy="12"
          r="2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </SvgIcon>
    )
  }
)
