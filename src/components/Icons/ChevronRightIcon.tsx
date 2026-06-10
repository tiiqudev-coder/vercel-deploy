import type { HTMLAttributes } from "react";

interface ChevronRightIconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ChevronRightIcon = ({
  size = 12,
  color = "currentColor",
  className = "",
  ...props
}: ChevronRightIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
    {...props}
  >
    <path
      d="M4.5 2.5L8 6L4.5 9.5"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronRightIcon;
