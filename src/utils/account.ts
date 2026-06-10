export interface AccountResponse {
  user: {
    first_name: string
    last_name: string
    email: string
    password: string
    language: string
    Time_zone: string
    email_notifications: {
      email_notes: string
      options: Array<{
        label: string
        value: string
      }>
    }
    updates: Array<{
      label: string
      value: boolean
    }>
    sign_in_notifications: {
      sign_in_notes: string
      options: Array<{
        label: string
        value: string
      }>
    }
    privacy: Array<{
      heading: string
      tagline: string
      label: string
      value: boolean
    }>
  }
}

export async function fetchAccount(): Promise<AccountResponse> {
  const response = await fetch('/testdata/fetchAccount.json')

  if (!response.ok) {
    throw new Error('Failed to fetch account details')
  }

  return response.json()
}
