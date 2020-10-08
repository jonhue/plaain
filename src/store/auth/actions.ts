import {
  AuthActionTypes,
  REMOVE_PROVIDER,
  UPDATE_PROVIDER,
  UPDATE_VERSION,
} from './types'
import { Provider } from '../../types/providers/Provider'

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

export const removeProvider = (id: string): AuthActionTypes => ({
  type: REMOVE_PROVIDER,
  payload: { id },
})
