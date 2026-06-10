import ProfileForm from '#/components/Accounts/subcomponents/ProfileForm'
import Button from '#/components/ui/Button'
import type { AccountResponse } from '#/utils/account'

interface ProfileProps {
  account: AccountResponse | null
}

const Profile = ({ account }: ProfileProps) => (
  <div className="w-89 flex flex-col">
    <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
    <ProfileForm account={account} />
    <div className="flex flex-1 mt-10">
      <div>
        <Button
          onClick={() => console.log('On Click to be wired up')}
          text="Update"
        />
      </div>
    </div>
  </div>
)

export default Profile
