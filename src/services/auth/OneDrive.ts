import { AuthenticationFailure } from '../../errors/AuthenticationFailure'
import { OneDrive } from '../../types/providers/OneDrive'
import { OneDriveAuthResponse } from './types'
import { ProviderKind } from '../../types/providers/Provider'
import { UserAgentApplication } from 'msal'
import { buildAuthId } from './util'
import { isMobile } from 'react-device-detect'

const CLIENT_ID = process.env.REACT_APP_MICROSOFT_CLIENT_ID!
const SCOPES = ['user.read', 'files.read.all']

const buildAuthResponse = (
  accessToken: string,
  name: string,
  expiresOn: Date,
): OneDriveAuthResponse => ({
  kind: ProviderKind.OneDrive,
  accessToken: { token: accessToken, validUntil: expiresOn.toISOString() },
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
  return silentLogIn(userAgentApplication)
}

const redirectLogIn = (userAgentApplication: UserAgentApplication) =>
  userAgentApplication.loginRedirect({
    scopes: SCOPES,
    prompt: 'select_account',
  })

const performAuth = async (
  userAgentApplication: UserAgentApplication,
): Promise<OneDriveAuthResponse | void> => {
  try {
    return await silentLogIn(userAgentApplication)
  } catch (error: unknown) {
    return isMobile
      ? redirectLogIn(userAgentApplication)
      : await popupLogIn(userAgentApplication)
  }
}

export const auth = async (
  provider: OneDrive | undefined,
): Promise<OneDriveAuthResponse | void> => {
  if (
    provider !== undefined &&
    new Date(provider.accessToken.validUntil) > new Date()
  )
    return provider

  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: CLIENT_ID,
    },
  })

  try {
    return await performAuth(userAgentApplication)
  } catch (error: unknown) {
    throw new AuthenticationFailure(ProviderKind.OneDrive)
  }
}

export const authHandleRedirect = async (): Promise<OneDriveAuthResponse> => {
  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: CLIENT_ID,
    },
  })

  return new Promise<OneDriveAuthResponse>((resolve) => {
    userAgentApplication.handleRedirectCallback((_, response) => {
      if (response === undefined)
        throw new AuthenticationFailure(ProviderKind.OneDrive)
      resolve(
        buildAuthResponse(
          response.accessToken,
          response.account.userName,
          response.expiresOn,
        ),
      )
    })
  })
}
