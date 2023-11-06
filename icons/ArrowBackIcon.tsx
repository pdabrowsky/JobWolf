import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const ArrowBackIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function ArrowBackIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" {...props}>
        <path
          d="M5 12L4.29289 11.2929L3.58579 12L4.29289 12.7071L5 12ZM20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V13ZM10.2929 5.29289L4.29289 11.2929L5.70711 12.7071L11.7071 6.70711L10.2929 5.29289ZM4.29289 12.7071L10.2929 18.7071L11.7071 17.2929L5.70711 11.2929L4.29289 12.7071ZM5 13H20V11H5V13Z"
          fill="currentColor"
        />
      </SvgIcon>
    )
  }
)
