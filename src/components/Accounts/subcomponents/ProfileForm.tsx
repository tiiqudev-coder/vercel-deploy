import { useEffect, useState } from 'react'
import FormInput from '#/components/ui/FormInput'
import FormLabel from '#/components/ui/FormLabel'
import type { AccountResponse } from '#/utils/account'

interface ProfileFormProps {
  account: AccountResponse | null
}

const ProfileForm = ({ account }: ProfileFormProps) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    orgName: '',
    location: '',
  })

  const [characters, setCharacter] = useState(70 - values.bio.length)

  useEffect(() => {
    if (!account) return

    setValues((prev) => ({
      ...prev,
      firstName: account.user.first_name,
      lastName: account.user.last_name,
    }))
  }, [account])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (name === 'bio') setCharacter(70 - value.length)
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col">
        <FormLabel htmlFor="firstName" text="Full Name" />
        <FormInput
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        <FormInput
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
      </div>
      <FormLabel htmlFor="bio" text="Bio" />
      <FormInput
        name="bio"
        value={values.bio}
        maxLength={70}
        onChange={handleChange}
      />
      <div className="flex justify-between">
        <p className="text-xs/5 text-gray-500 mt-3.5">
          Brief description for your profile.
          <br />
          URLs are hyperlinked.
        </p>
        <p className="text-xs/5 text-gray-500 mt-3.5">{characters} / 70</p>
      </div>
      <FormLabel htmlFor="orgName" text="Organization Name" />
      <FormInput
        name="orgName"
        value={values.orgName}
        onChange={handleChange}
      />
      <FormLabel htmlFor="location" text="Location" />
      <FormInput
        name="location"
        value={values.location}
        onChange={handleChange}
      />
    </form>
  )
}

export default ProfileForm
