/**
 * Sidebar Component
 *
 * A responsive sidebar navigation component that provides site navigation.
 * Features a collapsible design that overlays content rather than pushing it aside.
 *
 * Usage:
 * Wraps main application content and provides consistent navigation across all pages.
 * The sidebar remains fixed while main content adjusts its left margin to accommodate
 * the current sidebar width, ensuring content never gets hidden behind the sidebar.
 *
 * @param children - The main application content to be wrapped
 */

import { useState, type ReactNode } from 'react'

//Components
import Searchbar from './subcomponents/Searchbar'
import MapSide from './subcomponents/MapSide'
import NavTab from './subcomponents/NavTab'

//Assets
import qutiilogo2 from '../../assets/images/qutiilogo2.png'

//Icons
import LeftArrowIcon from '../Icons/LeftArrow'
import Compass from '../Icons/CompassIcon'
import Bookmark from '../Icons/BookmarkIcon'
import UploadIcon from '../Icons/UploadIcon'
import NotifyIcon from '../Icons/NotifyIcon'
import GraphIcon from '../Icons/GraphIcon'
import PortraitIcon from '../Icons/PortraitIcon'
import CogIcon from '../Icons/CogIcon'
import QuestionIcon from '../Icons/QuestionIcon'

interface SidebarProps {
  children: ReactNode
}

const navMainItems = [
  { to: '/bookmarks', label: 'Bookmark History', Icon: Bookmark },
  { to: '/upload', label: 'Upload PDF', Icon: UploadIcon },
  { to: '/notifications', label: 'Notifications', Icon: NotifyIcon },
  { to: '/leaderboard', label: 'Leaderboard', Icon: GraphIcon },
]

const navSecondItems = [
  { to: '/account', label: 'My Account', Icon: PortraitIcon },
  { to: '/settings', label: 'Settings', Icon: CogIcon },
]

export function Sidebar({ children }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className="relative flex h-screen w-full min-w-0 overflow-x-hidden">
        <div
          className={`fixed left-0 top-0 h-screen ${isExpanded ? 'w-70' : 'w-20.5'} bg-[#EFF1F2] transition-all duration-300 ease-in-out flex flex-col overflow-hidden z-10`}
          onClick={!isExpanded ? toggleSidebar : undefined}
        >
          <button
            className="w-full h-20.5 bg-transparent hover:bg-gray-200 active:bg-gray-300 cursor-pointer transition-colors duration-200 shrink-0 border-none p-0 flex flex-col"
            onClick={toggleSidebar}
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <div
              className={`flex items-center w-full p-5 pr-0 justify-between`}
            >
              <div className="flex">
                <img
                  src={qutiilogo2}
                  alt="Qutii Logo"
                  className="w-auto max-w-10 h-auto object-contain"
                />
                {isExpanded && (
                  <h1 className="text-[#034459] font-bold text-2xl whitespace-nowrap overflow-hidden pt-1 pl-1.5">
                    QuTii
                  </h1>
                )}
              </div>
              {isExpanded && (
                <div className="bg-[#4B7D94] h-9 w-10 flex justify-center items-center rounded-l-full text-white">
                  <LeftArrowIcon />
                </div>
              )}
            </div>
          </button>
          <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            <Searchbar />
            <MapSide isExpanded={isExpanded} />
            <NavTab
              to="/tutorial"
              label="Guidance"
              isExpanded={isExpanded}
              Icon={Compass}
            />
            <hr className="border-t border-gray-200 my-2" />
            {navMainItems.map(({ to, label, Icon }) => (
              <NavTab
                key={to}
                to={to}
                label={label}
                isExpanded={isExpanded}
                Icon={Icon}
              />
            ))}
            <hr className="border-t border-gray-200 my-2" />
            {navSecondItems.map(({ to, label, Icon }) => (
              <NavTab
                key={to}
                to={to}
                label={label}
                isExpanded={isExpanded}
                Icon={Icon}
              />
            ))}
            <div className="mt-auto">
              <NavTab
                to="/help"
                label="Help & Support"
                isExpanded={isExpanded}
                Icon={QuestionIcon}
              />
            </div>
          </nav>
        </div>
        <main className="flex h-screen min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto pl-20.5">
          {children}
        </main>
      </div>
    </>
  )
}
