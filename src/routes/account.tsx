import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

//API imports
import { fetchAccount, type AccountResponse } from '#/utils/account'
//Component imports
import SelectorComponent from '#/components/Account/SelectorComponent'
import EditProfile from '#/components/Account/EditProfile'
import AccountSettings from '#/components/Account/AccountSettings'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
})


function RouteComponent() {
  const [sideSelect, setSideSelect] = useState('profile')
  const [account, setAccount] = useState<AccountResponse | null>(null)

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accountData = await fetchAccount()

        console.log('Account data fetched successfully:', accountData)
        setAccount(accountData)
      } catch (error) {
        console.error('Failed to fetch account data:', error)
      }
    }

    void loadAccount()
  }, [])

  return (
    <div className="flex w-full h-full justify-center pt-30 pb-30">
      <div className="w-55 shrink"></div>
      <SelectorComponent
        sideSelect={sideSelect}
        setSideSelect={setSideSelect}
      />
      <div className="w-40 shrink"></div>
      {sideSelect === 'profile' && <EditProfile account={account} />}
      {sideSelect === 'settings' && <AccountSettings account={account} />}
    </div>
  )
}
