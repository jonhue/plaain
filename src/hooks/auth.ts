import { AppDispatch, RootState } from '../store'
import {
  authHandleRedirect,
  setupAuthHandleRedirect,
} from '../store/auth/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { AuthResponse } from '../services/auth/types'
import { RedirectCacheOrigin } from '../store/auth/types'
import useAsyncEffect from 'use-async-effect'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
  const dispatch = useDispatch<AppDispatch>()

  const redirectCache = useSelector(
    (state: RootState) => state.auth.redirectCache,
  )

  useEffect(() => {
    if (
      redirectCache === undefined ||
      redirectCache.origin !== RedirectCacheOrigin.Login
    )
      return
    dispatch(authHandleRedirect(redirectCache))
  }, [])
}

export const useSetupAuthRedirect = (
  callback: (response: AuthResponse) => void,
) => {
  const dispatch = useDispatch<AppDispatch>()

  const redirectCache = useSelector(
    (state: RootState) => state.auth.redirectCache,
  )

  useAsyncEffect(async () => {
    if (
      redirectCache === undefined ||
      redirectCache.origin !== RedirectCacheOrigin.Setup
    )
      return
    const response = await dispatch(setupAuthHandleRedirect(redirectCache))
    callback(response)
  }, [])
}
