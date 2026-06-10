import { useEffect, useState } from 'react'
import type { AccountResponse } from '#/utils/account'

interface SignInNotificationsProps {
  notifications?: AccountResponse['user']['sign_in_notifications']
}


const SignInNotifications = ({ notifications }: SignInNotificationsProps) => {
  const [selectedNotification, setSelectedNotification] = useState(
    notifications?.sign_in_notes ?? '',
  )

  useEffect(() => {
    setSelectedNotification(notifications?.sign_in_notes ?? '')
  }, [notifications])

  return (
    <div>
      <fieldset className="mt-8 flex flex-col">
        <legend className="mb-2 text-sm font-bold text-gray-900">
          Sign-in notifications
        </legend>
        <div className="flex flex-col gap-3">
          {notifications?.options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 text-sm text-gray-900"
            >
              <input
                type="radio"
                name="signInNotifications"
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

export default SignInNotifications
