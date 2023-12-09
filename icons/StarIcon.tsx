import { SvgIconProps, SvgIcon } from '@/components/atoms/SvgIcon'
import { forwardRef } from 'react'

export const StarIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  function StarIcon(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M10.1439 6.62758C10.9305 4.66658 11.3238 3.68608 12.0001 3.68608C12.6764 3.68608 13.0697 4.66658 13.8563 6.62758L13.893 6.7189C14.3373 7.82676 14.5595 8.3807 15.0124 8.71739C15.4652 9.05407 16.0597 9.10731 17.2486 9.21379L17.4636 9.23304C19.4094 9.4073 20.3823 9.49443 20.5905 10.1134C20.7986 10.7324 20.0761 11.3897 18.6311 12.7044L18.1488 13.1432C17.4173 13.8087 17.0515 14.1415 16.8811 14.5776C16.8493 14.659 16.8228 14.7423 16.8019 14.8271C16.6899 15.2818 16.797 15.7645 17.0112 16.73L17.0778 17.0305C17.4715 18.8048 17.6684 19.692 17.3247 20.0747C17.1963 20.2177 17.0293 20.3206 16.8439 20.3712C16.3477 20.5066 15.6433 19.9326 14.2343 18.7845C13.3091 18.0306 12.8465 17.6537 12.3154 17.5689C12.1065 17.5355 11.8937 17.5355 11.6847 17.5689C11.1536 17.6537 10.6911 18.0306 9.76589 18.7845C8.35694 19.9326 7.65246 20.5066 7.15626 20.3712C6.97084 20.3206 6.80393 20.2177 6.67551 20.0747C6.33183 19.692 6.52866 18.8048 6.92234 17.0305L6.98902 16.73C7.20322 15.7645 7.31033 15.2818 7.19827 14.8271C7.17737 14.7423 7.15093 14.659 7.11913 14.5776C6.94866 14.1415 6.58291 13.8087 5.8514 13.1432L5.36912 12.7044C3.92408 11.3897 3.20155 10.7324 3.40973 10.1134C3.61791 9.49443 4.59082 9.4073 6.53663 9.23304L6.75157 9.21379C7.94049 9.10731 8.53494 9.05407 8.98779 8.71739C9.44064 8.3807 9.66284 7.82676 10.1072 6.71889L10.1439 6.62758Z"
          stroke="currentColor"
        />
      </SvgIcon>
    )
  }
)