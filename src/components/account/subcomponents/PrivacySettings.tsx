import { useEffect, useState } from 'react'

import type { AccountResponse } from '#/utils/account'
import ToggleSwitch from '#/components/ui/ToggleSwitch'

interface PrivacySettingsProps {
  privacy?: AccountResponse['user']['privacy']
}

const PrivacySettings = ({ privacy }: PrivacySettingsProps) => {
  const [selectedPrivacy, setSelectedPrivacy] = useState<Record<string, boolean>>(
    () => Object.fromEntries(
      privacy?.map((privacyOption) => [privacyOption.label, privacyOption.value]) ?? []
    )
  );

  useEffect(() => {
    setSelectedPrivacy(
      Object.fromEntries(
        privacy?.map((privacyOption) => [
          privacyOption.label,
          privacyOption.value,
        ]) ?? [],
      ),
    )
  }, [privacy])

  return (
    <fieldset className="mt-8 flex flex-col pb-8">
      <legend className="mb-2 text-sm font-bold text-gray-900">Privacy</legend>

      <div className="flex flex-col gap-5">
        {privacy?.map((privacyOption) => (
          <label
            key={privacyOption.label}
            className="flex items-end text-sm text-gray-900 justify-between p-2 rounded hover:bg-gray-100 cursor-pointer w-full"
          >
            <div className="flex flex-col">
              <p className="font-bold">{privacyOption.heading}</p>
              <p className="mt-1 text-gray-600">{privacyOption.tagline}</p>
              <p className="mt-1 text-gray-600">{privacyOption.label}</p>
            </div>
            <ToggleSwitch
              isOn={Boolean(selectedPrivacy[privacyOption.label])}
              onChange={(checked) =>
                setSelectedPrivacy((current) => ({
                  ...current,
                  [privacyOption.label]: checked,
                }))
              }
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default PrivacySettings
