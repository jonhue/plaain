import { AuthState } from './types'

export const providersSelector = (state: AuthState) =>
  Object.keys(state.providers).map((id) => state.providers[id]!)
