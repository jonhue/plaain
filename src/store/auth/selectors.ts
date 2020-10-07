import { AuthState } from './types'

export const providerSelector = (id: string) => (state: AuthState) =>
  state.providers[id]

export const providersSelector = (state: AuthState) =>
  Object.keys(state.providers).map((id) => state.providers[id]!)
