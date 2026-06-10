// Icon for bookmark - can be altered by passing props to it
import type { HTMLAttributes } from 'react'

interface IconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

export default function Bookmark({
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8 16.4C11.5111 15.8667 12.4889 15.8667 13.2 16.4L16.4 18.8C17.0592 19.2944 18 18.824 18 18V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V18C6 18.824 6.94076 19.2944 7.6 18.8L10.8 16.4ZM12 18L15.2 20.4C17.1777 21.8833 20 20.4721 20 18V5C20 3.34315 18.6569 2 17 2H7C5.34315 2 4 3.34315 4 5V18C4 20.4721 6.82229 21.8833 8.8 20.4L12 18Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 7C8 6.44772 8.44772 6 9 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H9C8.44772 8 8 7.55228 8 7Z"
        fill="currentColor"
      />
    </svg>
  )
}
