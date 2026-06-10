import type { HTMLAttributes } from 'react'

interface LeftArrowIconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

const LeftArrowIcon = ({
  size = 24,
  className = '',
  ...props
}: LeftArrowIconProps) => (
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
      d="M2.89941 12H20.8994"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.8994 18L2.89941 12L8.8994 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default LeftArrowIcon
