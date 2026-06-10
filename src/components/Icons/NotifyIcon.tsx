// Icon for compass - can be altered by passing props to it
import type { HTMLAttributes } from 'react'

interface CompassIconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

export default function NotifyIcon({
  size = 24,
  className = '',
  ...props
}: CompassIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5 19V10.5C5 6.634 8.134 3.5 12 3.5C15.866 3.5 19 6.634 19 10.5V19M2 19H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22C13.3807 22 14.5 20.8807 14.5 19.5V19H9.5V19.5C9.5 20.8807 10.6193 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="2.5" r="1.5" fill="currentColor" />
    </svg>
  )
}
