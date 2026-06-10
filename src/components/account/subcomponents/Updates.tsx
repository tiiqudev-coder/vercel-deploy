import { useEffect, useState } from 'react'

import type { AccountResponse } from '#/utils/account'

interface UpdatesProps {
  updates?: AccountResponse['user']['updates']
}

const Updates = ({ updates }: UpdatesProps) => {
  const [selectedUpdates, setSelectedUpdates] = useState<
    Record<string, boolean>
  >({})

  useEffect(() => {
    setSelectedUpdates(
      Object.fromEntries(
        updates?.map((update) => [update.label, update.value]) ?? [],
      ),
    )
  }, [updates])

  return (
    <fieldset className="mt-8 flex flex-col">
      <legend className="mb-2 text-sm font-bold text-gray-900">Updates</legend>
      <p className="text-sm text-gray-500">
        From time to time, we'd like to send you emails with interesting news about TiiQu. You can choose which of these updates you'd like to receive:
      </p>
      <div className="flex flex-col gap-3">
        {updates?.map((update) => (
          <label
            key={update.label}
            className="flex items-center gap-3 text-sm text-gray-900"
          >
            <input
              type="checkbox"
              checked={Boolean(selectedUpdates[update.label])}
              onChange={(event) =>
                setSelectedUpdates((current) => ({
                  ...current,
                  [update.label]: event.target.checked,
                }))
              }
              className="size-4 rounded accent-[#136682]"
            />
            <span>{update.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default Updates

