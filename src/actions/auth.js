import { PROVIDERS } from '../constants'

import MicrosoftAuth from '../services/auth/MicrosoftAuth'

import { loadingBegin, loadingStop } from './loading'
import { index } from './indexing'

export const LOG_IN_BEGIN = 'LOG_IN_BEGIN'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const authenticateMicrosoft = () => {
  return (dispatch, getState) => {
    dispatch(loadingBegin('Authenticating...'))
    dispatch(logInBegin(PROVIDERS.MICROSOFT))

    new MicrosoftAuth().perform().then(token => {
      dispatch(logInSuccess(PROVIDERS.MICROSOFT, token))
      dispatch(loadingStop())

      if (!getState().indexing.lastIndexed)
        dispatch(index())
    }).catch(error => {
      console.log(error)
      dispatch(logInFailure(PROVIDERS.MICROSOFT, error))
      dispatch(loadingStop())
    })
  }
}

export const logInExpired = provider => {
  return dispatch => dispatch(logInFailure(provider, 'expired'))
}

const logInBegin = provider => ({
  type: LOG_IN_BEGIN,
  payload: provider
})

const logInSuccess = (provider, token) => ({
  type: LOG_IN_SUCCESS,
  payload: { provider, token }
})

const logInFailure = (provider, error) => ({
  type: LOG_IN_FAILURE,
  payload: { provider, error }
})
