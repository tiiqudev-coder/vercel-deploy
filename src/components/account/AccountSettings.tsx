import type { AccountResponse } from '#/utils/account'

// UI imports
import Expander from '../ui/Expander'

import Email from './subcomponents/AccountSettings/Email'
import DeleteAccount from './subcomponents/DeleteAccount'
import EmailNotifications from './subcomponents/AccountSettings/EmailNotifications'
import Language from './subcomponents/AccountSettings/Language'
import Password from './subcomponents/AccountSettings/Password'
import PrivacySettings from './subcomponents/PrivacySettings'
import SignInNotifications from './subcomponents/AccountSettings/SignInNotifications'
import TimeZone from './subcomponents/AccountSettings/TimeZone'
import Updates from './subcomponents/Updates'

interface AccountSettingsProps {
  account: AccountResponse | null
}


const AccountSettings = ({ account }: AccountSettingsProps) => {
  return (
    <div className="w-4xl flex flex-col  overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      <div className="bg-white w-full rounded-2xl pt-12 pl-4 pr-4">
        <h2 className="text-black font-bold text-xl pb-8">Account Settings</h2>

        <Expander title="Email">
          {(isExpanded) =>
            isExpanded ? (
              <>
                <Email email={account?.user.email} />
              </>
            ) : (
              <p>{`${account?.user.email}`}</p>
            )
          }
        </Expander>
        <Expander title="Password">
          {(isExpanded) =>
            isExpanded ? (
              <>
                <Password />
              </>
            ) : (
              <p>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</p>
            )
          }
        </Expander>
        <Expander title="Language">
          {(isExpanded) =>
            isExpanded ? (
              <>
                <Language language={account?.user.language} />
              </>
            ) : (
              ''
            )
          }
        </Expander>
        <Expander title="Time Zone">
          {(isExpanded) =>
            isExpanded ? (
              <>
                <TimeZone timeZone={account?.user.Time_zone} />
              </>
            ) : (
              ''
            )
          }
        </Expander>
        <Expander title="Notifications">
          {(isExpanded) =>
            isExpanded ? (
              <>
                <EmailNotifications
                  notifications={account?.user.email_notifications}
                />
                <Updates updates={account?.user.updates} />
                <SignInNotifications
                  notifications={account?.user.sign_in_notifications}
                />
              </>
            ) : (
              ''
            )
          }
        </Expander>
        <Expander title="Data Privacy" isLast={true}>
          {(isExpanded) =>
            isExpanded ? (
              <>
                <PrivacySettings privacy={account?.user.privacy} />
              </>
            ) : (
              ''
            )
          }
        </Expander>
      </div>
      <DeleteAccount />
    </div>
  )
}

export default AccountSettings
