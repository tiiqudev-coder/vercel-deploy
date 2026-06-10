// Icon for UploadIcon - can be altered by passing props to it
import type { HTMLAttributes } from 'react'

interface IconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

export default function UploadIcon({
  size = 24,
  className = '',
  ...props
}: IconProps) {
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
      <g clipPath="url(#clip0_2_2081)">
        <mask
          id="mask0_2_2081"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <path d="M24 0H0V24H24V0Z" fill="currentColor" />
        </mask>

        <path
          d="M3 12.0042V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 7.5L13.4142 4.41421C12.6332 3.63316 11.3668 3.63317 10.5858 4.41421L7.5 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9961 16L12 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
