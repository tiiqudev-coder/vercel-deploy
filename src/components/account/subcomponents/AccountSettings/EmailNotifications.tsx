import { useEffect, useState } from 'react'

import type { AccountResponse } from '#/utils/account'

interface EmailNotificationsProps {
  notifications?: AccountResponse['user']['email_notifications']
}

const EmailNotifications = ({ notifications }: EmailNotificationsProps) => {
  const [selectedNotification, setSelectedNotification] = useState(
    notifications?.email_notes ?? '',
  )

  useEffect(() => {
    setSelectedNotification(notifications?.email_notes ?? '')
  }, [notifications])

  return (
    <div>
      <fieldset className="mt-8 flex flex-col">
        <legend className="mb-2">
          <h2 className="text-sm font-bold text-gray-900">
            Email notifications
          </h2>
          <p className="text-sm font-normal text-[#84818A]">
            When you're busy or not online, TiiQu can send you email
            notifications for any new direct messages or mentions of your name.
          </p>
        </legend>
        <div className="flex flex-col gap-3">
          {notifications?.options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 text-sm text-gray-900"
            >
              <input
                type="radio"
                name="emailNotifications"
                value={option.value}
                checked={selectedNotification === option.value}
                onChange={(event) =>
                  setSelectedNotification(event.target.value)
                }
                className="size-4 accent-[#136682]"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

    </div>
  )
}

export default EmailNotifications
