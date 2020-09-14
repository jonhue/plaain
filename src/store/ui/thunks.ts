import { asyncBegin, asyncEnd, addNotification } from './actions'
import { AppThunk } from '../index'
import { NotificationKind } from '../../types/Notification'

export const load = <ReturnType>(
  fn: AppThunk<Promise<ReturnType>>,
) => (): AppThunk<Promise<ReturnType | undefined>> => async (dispatch) => {
  dispatch(asyncBegin())

  let result
  try {
    result = await dispatch(fn)
  } catch (error: unknown) {
    console.log('error', error)

    if (error instanceof Error) {
      dispatch(addNotification({ kind: NotificationKind.GenericError, error }))
    }
  }

  dispatch(asyncEnd())

  return result
}
