import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import FormInput from '#/components/ui/FormInput'
import FormLabel from '#/components/ui/FormLabel'


const Password = () => {
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const passwordsDoNotMatch =
    repeatPassword.length > 0 && newPassword !== repeatPassword

  return (
    <form>
      <FormLabel
        htmlFor="newPassword"
        text="Enter new password"
        className="mt-6"
      />
      <div className="relative">
        <FormInput
          name="newPassword"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          type={showNewPassword ? 'text' : 'password'}
          className="w-full p-2 pr-10"
        />
        <button
          type="button"
          aria-label={
            showNewPassword ? 'Hide new password' : 'Show new password'
          }
          title={showNewPassword ? 'Hide new password' : 'Show new password'}
          onClick={() => setShowNewPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <FormLabel
        htmlFor="repeatPassword"
        text="Repeat new password"
        className="mt-6"
      />
      <div className="relative">
        <FormInput
          name="repeatPassword"
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
          type={showRepeatPassword ? 'text' : 'password'}
          className="w-full p-2 pr-10"
        />
        <button
          type="button"
          aria-label={
            showRepeatPassword
              ? 'Hide repeated password'
              : 'Show repeated password'
          }
          title={
            showRepeatPassword
              ? 'Hide repeated password'
              : 'Show repeated password'
          }
          onClick={() => setShowRepeatPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <p className="mt-2 h-4 text-sm text-red-600">
        {passwordsDoNotMatch && 'Passwords do not match.'}
      </p>
    </form>
  )
}

export default Password
