import MapIcon from '#/components/Icons/MapIcon'
import { Link } from '@tanstack/react-router'

type MapSideProps = {
  isExpanded: boolean
}

const MapSide = ({ isExpanded }: MapSideProps) => {
  return (
    <Link to="/map">
      {({ isActive }) => (
        <div
          className={`flex items-center rounded-lg px-3.5 py-3 transition-all duration-300 ease-in-out ${
            isActive
              ? 'text-(--text-active) bg-white font-bold'
              : 'text-(--text-inactive)'
          }`}
        >
          <div className="h-6 w-6 flex items-center justify-center shrink-0">
            <MapIcon />
          </div>
          {isExpanded && (
            <p className="ml-6.5 whitespace-nowrap overflow-hidden text-sm">
              Map of Knowledge
            </p>
          )}
        </div>
      )}
    </Link>
  )
}

export default MapSide
