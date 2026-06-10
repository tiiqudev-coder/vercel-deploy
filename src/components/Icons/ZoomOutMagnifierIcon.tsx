import type { HTMLAttributes } from "react";

interface ZoomOutMagnifierIconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ZoomOutMagnifierIcon = ({
  size = 16,
  color = "currentColor",
  className = "",
  ...props
}: ZoomOutMagnifierIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
    {...props}
  >
    <circle cx="7" cy="7" r="4.25" stroke={color} strokeWidth="1.25" />
    <path
      d="M10 10L13.5 13.5"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path d="M5 7H9" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

export default ZoomOutMagnifierIcon;
