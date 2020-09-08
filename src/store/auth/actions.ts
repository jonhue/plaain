import { Provider } from '../../types/providers/Provider'
import {
  AuthActionTypes,
  REMOVE_PROVIDER,
  UPDATE_PROVIDER,
  UPDATE_VERSION,
} from './types'

export const updateProvider = (provider: Provider): AuthActionTypes => ({
  type: UPDATE_PROVIDER,
  payload: {
    provider,
  },
})

export const updateVersion = (version: string): AuthActionTypes => ({
  type: UPDATE_VERSION,
  payload: { version },
})

export const removeProvider = (id: number): AuthActionTypes => ({
  type: REMOVE_PROVIDER,
  payload: { id },
})
