import Profile from '#/components/Accounts/subcomponents/Profile'
import Picture from '#/components/Accounts/subcomponents/Picture'
import type { AccountResponse } from '#/utils/account'

interface EditProfileProps {
  account: AccountResponse | null
}

// Display layer logic
const EditProfile = ({ account }: EditProfileProps) => {
  return (
    <div className="w-4xl flex justify-around bg-white rounded-2xl pt-12 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      <Profile account={account} />
      <Picture />
    </div>
  )
}

export default EditProfile
