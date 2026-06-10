// Icon for solid portrait - can be altered by passing props to it
import type { HTMLAttributes } from 'react'

interface IconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

export default function Icon({
  size = 20,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M18 0C19.1046 2.57702e-07 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 1.61067e-08 19.1046 0 18V2C2.57706e-07 0.895431 0.895431 1.61064e-08 2 0H18ZM10 12C7.9975 12 4 12.8937 4 14.667V16H16V14.667C16 12.8937 12.0025 12 10 12ZM10 4C8.3425 4 7 5.3425 7 7C7 8.6575 8.3425 10 10 10C11.6575 10 13 8.6575 13 7C13 5.3425 11.6575 4 10 4Z"
        fill="currentColor"
      />
    </svg>
  )
}
