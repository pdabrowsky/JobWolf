import { forwardRef } from 'react'

import { SvgIconProps } from './SvgIcon.types'
import { cn } from '@/lib/utils'

export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function SvgIcon(props, ref) {
    const { children, className, ...rest } = props

    return (
      <svg
        ref={ref}
        className={cn('inline-block flex-shrink-0 select-none', className)}
        focusable="false"
        {...rest}
      >
        {children}
      </svg>
    )
  }
)
