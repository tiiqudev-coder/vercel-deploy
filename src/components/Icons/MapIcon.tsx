// Map icon, sized can be changed by passing down size props, inherits parents colour attributes
import type { HTMLAttributes } from 'react'

interface MapIconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

export default function MapIcon({
  size = 24,
  className = '',
  ...props
}: MapIconProps) {
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
        d="M4.20645 4.31488L8.14074 3.23576C8.70147 3.08196 9.29483 3.09442 9.84861 3.27163L14.1514 4.64852C14.7052 4.82574 15.2985 4.8382 15.8593 4.6844L18.8387 3.86718C20.4299 3.43074 22 4.62819 22 6.27813V16.7921C22 18.1434 21.0967 19.3278 19.7936 19.6853L15.8593 20.7644C15.2985 20.9182 14.7052 20.9057 14.1514 20.7285L9.84861 19.3516C9.29483 19.1744 8.70147 19.162 8.14073 19.3158L5.16129 20.133C3.57012 20.5694 2 19.372 2 17.722V7.20803C2 5.85679 2.90334 4.67231 4.20645 4.31488ZM4.73548 6.24364L8 5.34823V17.297C7.86975 17.3217 7.74021 17.3517 7.6117 17.387L4.63226 18.2042C4.31403 18.2915 4 18.052 4 17.722V7.20803C4 6.75761 4.30111 6.36279 4.73548 6.24364ZM10.4582 17.4468C10.307 17.3984 10.1541 17.3574 10 17.3238V5.41998L13.5418 6.55337C13.693 6.60173 13.8459 6.64273 14 6.67636V18.5802L10.4582 17.4468ZM16 18.6519L19.2645 17.7565C19.6989 17.6374 20 17.2425 20 16.7921V6.27813C20 5.94814 19.686 5.70865 19.3677 5.79594L16.3883 6.61316C16.2598 6.64841 16.1303 6.67842 16 6.70319V18.6519Z"
        fill="currentColor"
      />
    </svg>
  )
}
