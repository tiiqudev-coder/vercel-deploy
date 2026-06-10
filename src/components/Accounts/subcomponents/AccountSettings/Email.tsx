import { useState } from 'react'

import FormInput from '#/components/ui/FormInput'
import FormLabel from '#/components/ui/FormLabel'

interface EmailProps {
  email?: string
}

const Email = ({ email }: EmailProps) => {
  const [newEmail, setNewEmail] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value)
  }
  return (
      <form>
        <FormLabel htmlFor="current" text="Current email" />
        <FormInput name="current" value={email} readOnly className='p-2' />
        <FormLabel htmlFor="new" text="Enter new email" className="mt-6" />
        <FormInput
          name="new"
          value={newEmail}
          onChange={handleChange}
          type="email"
          className='p-2'
        />
      </form>

  )
}

export default Email
