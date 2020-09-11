import { asyncBegin, asyncEnd, addNotification } from './actions'
import { AppThunk } from '../index'
import { NotificationKind } from '../../types/Notification'

export const load = (
  f: AppThunk<Promise<void>>,
): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch(asyncBegin())

  try {
    await dispatch(f)
  } catch (error: unknown) {
    console.log('error', error)

    if (error instanceof Error) {
      dispatch(addNotification({ kind: NotificationKind.GenericError, error }))
    }
  }

  dispatch(asyncEnd())
}
