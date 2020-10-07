import { AuthenticationFailure } from '../../errors/AuthenticationFailure'
import { OneDrive } from '../../types/providers/OneDrive'
import { OneDriveAuthResponse } from './types'
import { ProviderKind } from '../../types/providers/Provider'
import { UserAgentApplication } from 'msal'
import { buildAuthId } from './util'

const CLIENT_ID = process.env.REACT_APP_MICROSOFT_CLIENT_ID!
const SCOPES = ['user.read', 'files.read.all']

const buildAuthResponse = (
  accessToken: string,
  name: string,
  expiresOn: Date,
): OneDriveAuthResponse => ({
  kind: ProviderKind.OneDrive,
  accessToken: { token: accessToken, validUntil: expiresOn },
  id: buildAuthId(ProviderKind.OneDrive, name),
  name,
})

const silentLogIn = async (
  userAgentApplication: UserAgentApplication,
): Promise<OneDriveAuthResponse> => {
  const {
    accessToken,
    account,
    expiresOn,
  } = await userAgentApplication.acquireTokenSilent({
    scopes: SCOPES,
  })

  return buildAuthResponse(accessToken, account.userName, expiresOn)
}

const popupLogIn = async (
  userAgentApplication: UserAgentApplication,
): Promise<OneDriveAuthResponse> => {
  await userAgentApplication.loginPopup({
    scopes: SCOPES,
    prompt: 'select_account',
  })
  const {
    accessToken,
    account,
    expiresOn,
  } = await userAgentApplication.acquireTokenSilent({
    scopes: SCOPES,
  })

  return buildAuthResponse(accessToken, account.userName, expiresOn)
}

const performAuth = async (
  userAgentApplication: UserAgentApplication,
  allowSilent: boolean,
): Promise<OneDriveAuthResponse> => {
  if (!allowSilent) return await popupLogIn(userAgentApplication)

  try {
    return await silentLogIn(userAgentApplication)
  } catch (error) {
    return await popupLogIn(userAgentApplication)
  }
}

export const auth = async (
  provider: OneDrive | undefined,
  allowSilent = true,
): Promise<OneDriveAuthResponse> => {
  if (provider !== undefined && provider.accessToken.validUntil > new Date())
    return provider

  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: CLIENT_ID,
    },
  })

  try {
    return await performAuth(userAgentApplication, allowSilent)
  } catch (error) {
    throw new AuthenticationFailure(ProviderKind.OneDrive)
  }
}
