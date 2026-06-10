import { useEffect, useState } from 'react'

import Button from '#/components/ui/Button'

interface TimeZoneProps {
  timeZone?: string
}

const timeZoneOptions = Array.from({ length: 27 }, (_, index) => {
  const offset = index - 12
  const label = offset === 0 ? 'GMT' : `GMT${offset > 0 ? '+' : ''}${offset}`

  return {
    label,
    value: label,
  }
})

const handleUpdate = () => {
  console.log('handleUpdate to be added')
}

const handleCancel = () => {
  console.log('handleCancel to be added')
}

const TimeZone = ({ timeZone }: TimeZoneProps) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZone ?? '')

  useEffect(() => {
    setSelectedTimeZone(timeZone ?? '')
  }, [timeZone])

  return (
    <div className="mt-8 flex flex-col">
      <label
        htmlFor="timeZone"
        className="mb-1 block text-sm font-bold text-gray-900"
      >
        Time zone
      </label>
      <select
        id="timeZone"
        name="timeZone"
        value={selectedTimeZone}
        onChange={(event) => setSelectedTimeZone(event.target.value)}
        className="mt-3 rounded border border-gray-200 p-2 text-sm text-gray-900"
      >
        <option value="">Select timezone</option>
        {timeZoneOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pt-4 flex">
        <Button onClick={handleUpdate} text="Update" colour="blue" />
        <div className="w-2"></div>
        <Button onClick={handleCancel} text="Cancel" colour="white" />
      </div>
    </div>
  )
}

export default TimeZone
