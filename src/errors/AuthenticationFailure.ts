import { ProviderKind } from "../types/providers/Provider"

export class AuthenticationFailure extends Error {
  provider: ProviderKind

  constructor(provider: ProviderKind, ...args: any[]) {
    super(...args)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationFailure)
    }

    this.name = 'AuthenticationFailure'
    this.provider = provider
  }
}
