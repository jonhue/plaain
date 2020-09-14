import { OneDrive } from '../../types/providers/OneDrive'
import { ProviderKind } from '../../types/providers/Provider'
import { UserAgentApplication } from 'msal'
import { buildAuthId } from './util'

const CLIENT_ID = process.env.REACT_APP_MICROSOFT_CLIENT_ID!
const SCOPES = ['user.read', 'files.read.all']

const silentLogIn = async (userAgentApplication: UserAgentApplication) => {
  const {
    accessToken,
    account,
    expiresOn,
    uniqueId,
  } = await userAgentApplication.acquireTokenSilent({
    scopes: SCOPES,
  })

  return {
    accessToken: { token: accessToken, validUntil: expiresOn },
    id: uniqueId,
    name: account.name,
  }
}

const popupLogIn = async (userAgentApplication: UserAgentApplication) => {
  await userAgentApplication.loginPopup({
    scopes: SCOPES,
    prompt: 'select_account',
  })
  const {
    accessToken,
    account,
    expiresOn,
    uniqueId,
  } = await userAgentApplication.acquireTokenSilent({
    scopes: SCOPES,
  })

  return {
    accessToken: { token: accessToken, validUntil: expiresOn },
    id: uniqueId,
    name: account.name,
  }
}

export const auth = async (provider: OneDrive | undefined) => {
  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: CLIENT_ID,
    },
  })

  const { accessToken, id, name } = await silentLogIn(
    userAgentApplication,
  ).catch(() => popupLogIn(userAgentApplication))

  return {
    kind: ProviderKind.OneDrive,
    id: provider?.id || buildAuthId(ProviderKind.OneDrive, id),
    name,
    accessToken,
  }
}
