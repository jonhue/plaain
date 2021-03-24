import {
  AccountInfo,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from '@azure/msal-browser'
import { AuthenticationFailure } from '../../errors/AuthenticationFailure'
import { OneDrive } from '../../types/providers/OneDrive'
import { OneDriveAuthResponse } from './types'
import { ProviderKind } from '../../types/providers/Provider'
import { buildAuthId } from './util'
import { isMobile } from 'react-device-detect'

const CLIENT_ID = process.env.REACT_APP_MICROSOFT_CLIENT_ID!
const SCOPES = ['user.read', 'files.read.all']

const buildAuthResponse = (
  accessToken: string,
  account: AccountInfo,
  expiresOn: Date,
): OneDriveAuthResponse => ({
  kind: ProviderKind.OneDrive,
  accessToken: { token: accessToken, validUntil: expiresOn.toISOString() },
  id: buildAuthId(ProviderKind.OneDrive, account.username),
  name: account.username,
  account,
})

const silentLogIn = async (
  app: PublicClientApplication,
  account: AccountInfo,
): Promise<OneDriveAuthResponse> => {
  const {
    accessToken,
    account: newAccount,
    expiresOn,
  } = await app.acquireTokenSilent({
    scopes: SCOPES,
    account,
  })
  if (!newAccount || !expiresOn)
    throw new AuthenticationFailure(ProviderKind.OneDrive)
  return buildAuthResponse(accessToken, newAccount, expiresOn)
}

const popupLogIn = async (
  app: PublicClientApplication,
): Promise<OneDriveAuthResponse> => {
  const { account } = await app.loginPopup({
    scopes: SCOPES,
  })
  if (!account) throw new AuthenticationFailure(ProviderKind.OneDrive)
  return silentLogIn(app, account)
}

const redirectLogIn = (app: PublicClientApplication) =>
  app.loginRedirect({
    scopes: SCOPES,
  })

const interactiveLogIn = async (
  app: PublicClientApplication,
  onRedirect: () => void,
) => {
  if (isMobile) {
    onRedirect()
    return redirectLogIn(app)
  }
  return await popupLogIn(app)
}

const performAuth = async (
  app: PublicClientApplication,
  account: AccountInfo | undefined,
  onRedirect: () => void,
): Promise<OneDriveAuthResponse | void> => {
  if (account === undefined) return await interactiveLogIn(app, onRedirect)

  try {
    return await silentLogIn(app, account)
  } catch (error: unknown) {
    if (error instanceof InteractionRequiredAuthError)
      return await interactiveLogIn(app, onRedirect)
    else throw error
  }
}

export const auth = async (
  provider: OneDrive | undefined,
  onRedirect: () => void,
): Promise<OneDriveAuthResponse | void> => {
  if (
    provider !== undefined &&
    new Date(provider.accessToken.validUntil) > new Date()
  )
    return provider

  const app = new PublicClientApplication({
    auth: {
      clientId: CLIENT_ID,
    },
  })

  try {
    return await performAuth(app, provider?.account, onRedirect)
  } catch (error: unknown) {
    throw new AuthenticationFailure(ProviderKind.OneDrive)
  }
}

export const authHandleRedirect = async (): Promise<OneDriveAuthResponse> => {
  const app = new PublicClientApplication({
    auth: {
      clientId: CLIENT_ID,
    },
  })
  const response = await app.handleRedirectPromise()
  if (!response?.account) throw new AuthenticationFailure(ProviderKind.OneDrive)
  return silentLogIn(app, response.account)
}
