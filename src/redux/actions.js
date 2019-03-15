import { LOG_IN } from './actionTypes'

export const logIn = (auth) => ({
  type: LOG_IN,
  payload: auth
})
