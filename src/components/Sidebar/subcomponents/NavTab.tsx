// Generic icon and text holder for standard side bar components
import type { FC } from 'react'
import { Link } from '@tanstack/react-router'

type NavTabProps = {
  isExpanded: boolean
  label: string
  to: string
  Icon: FC<{ className?: string }>
}

const NavTab = ({ isExpanded, label, Icon, to }: NavTabProps) => (
  <Link to={to}>
    {({ isActive }) => (
      <div
        className={`flex items-center rounded-lg px-3.5 py-3 transition-all duration-300 ease-in-out ${
          isActive
            ? 'text-(--text-active) bg-white font-bold'
            : 'text-(--text-inactive)'
        }`}
      >
        <div className="h-6 w-6 flex items-center justify-center shrink-0">
          <Icon />
        </div>
        {isExpanded && (
          <p className="ml-6.5 whitespace-nowrap overflow-hidden text-sm">
            {label}
          </p>
        )}
      </div>
    )}
  </Link>
)

export default NavTab
