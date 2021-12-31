import { FTPAuthResponse, FTPAuthSetup } from './types'
import { AuthenticationFailure } from '../../errors/AuthenticationFailure'
import { ProviderKind } from '../../types/providers/Provider'
import { buildAuthId } from './util'
// import { getClient } from '../drives/FTP/api'

export const auth = async (
  provider: FTPAuthSetup,
): Promise<FTPAuthResponse> => {
  try {
    // await getClient(
    //   provider.host,
    //   provider.port,
    //   provider.username,
    //   provider.password,
    //   provider.secure,
    // )
    return {
      ...provider,
      id: buildAuthId(ProviderKind.FTP, `${provider.host}:${provider.port}`),
    }
  } catch (error: unknown) {
    throw new AuthenticationFailure(ProviderKind.FTP)
  }
}
