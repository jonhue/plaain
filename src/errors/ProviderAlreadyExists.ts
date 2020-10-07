import { Provider } from '../types/providers/Provider'

export class ProviderAlreadyExists extends Error {
  provider: Provider

  constructor(provider: Provider) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProviderAlreadyExists)
    }

    this.name = 'ProviderAlreadyExists'
    this.provider = provider
  }
}
