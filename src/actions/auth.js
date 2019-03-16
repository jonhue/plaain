import MicrosoftAuth from '../services/auth/MicrosoftAuth'

import { index } from './indexing'

export const LOG_IN_BEGIN = 'LOG_IN_BEGIN'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const logIn = () => {
  return dispatch => {
    dispatch(logInBegin())

    new MicrosoftAuth().perform().then(auth => {
      dispatch(logInSuccess(auth))
      dispatch(index())
    }).catch(error => dispatch(logInFailure(error)))
  }
}

const logInBegin = () => ({
  type: LOG_IN_BEGIN
})

const logInSuccess = auth => ({
  type: LOG_IN_SUCCESS,
  payload: auth
})

const logInFailure = error => ({
  type: LOG_IN_FAILURE,
  payload: error
})
