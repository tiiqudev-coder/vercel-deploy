import type { FC } from 'react'

interface SelectorProps {
  Icon: FC<{ className?: string }>
  label: string
  isActive?: boolean
  onClick?: () => void
}

const Selector = ({
  Icon,
  label = '',
  isActive = false,
  onClick,
}: SelectorProps) => (
  <button
    className={`flex items-center px-3.5 py-3 rounded-xl cursor-pointer ${isActive && 'bg-[#DEF2F1] text-(--text-active) font-bold'}`}
    onClick={onClick}
  >
    <div className="h-6 w-6 flex shrink-0 items-center justify-center">
      {Icon && <Icon />}
    </div>
    <p className="ml-4">{label}</p>
  </button>
)

export default Selector