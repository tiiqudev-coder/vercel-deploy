// a UI component with a usestate to expand and collapse content

import React, { useState } from 'react'

import Button from './Button'

interface ExpanderProps {
  children: (isExpanded: boolean) => React.ReactNode
  title?: string
  isLast?: boolean
}

const handleUpdate = () => {
  console.log('handleUpdate to be added')
}

const Expander: React.FC<ExpanderProps> = ({ children, title, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpanded = () => setIsExpanded((current) => !current)

  return (
    <div className="flex flex-col my-2">
      <div className="flex w-full justify-between">
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <button
          onClick={toggleExpanded}
          className="text-sm text-[#353e41] bg-gray-200 w-12 rounded"
        >
          {isExpanded ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <div className="mt-1">{children(isExpanded)}</div>
      {isExpanded && (
        <div className="pt-4 flex">
          <Button onClick={handleUpdate} text="Update" colour="blue" />
          <div className="w-2"></div>
          <Button onClick={toggleExpanded} text="Cancel" colour="white" />
        </div>
      )}
      {!isLast ? <hr className="border-t border-gray-200 my-2" /> : <div className='my-2'></div>}
    </div>
  )
}

export default Expander
