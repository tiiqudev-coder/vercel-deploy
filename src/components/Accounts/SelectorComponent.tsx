import SolidPortrait from "#/components/Icons/SolidPortrait"

import Selector from "#/components/Accounts/subcomponents/Selector"

const SelectorComponent = ({
  sideSelect,
  setSideSelect,
}: {
  sideSelect: string
  setSideSelect: (value: string) => void
}) => {
  return (
    <div className="flex flex-col min-w-62 shrink-0">
      <h1 className="text-4xl text-gray-900 font-bold">My Account</h1>
      <h2 className="text-sm mt-2 text-gray-600 mb-10">
        Update and manage your account
      </h2>
      <Selector
        Icon={SolidPortrait}
        label={'Edit Profile'}
        isActive={sideSelect === 'profile'}
        onClick={() => setSideSelect('profile')}
      />
      <Selector
        Icon={SolidPortrait}
        label={'Account Settings'}
        isActive={sideSelect === 'settings'}
        onClick={() => setSideSelect('settings')}
      />
      <p className="text-(--text-active) cursor-pointer hover:font-bold mt-20 ml-4">
        Log out
      </p>
    </div>
  )
}

export default SelectorComponent