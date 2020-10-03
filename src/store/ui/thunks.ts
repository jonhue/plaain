import { asyncBegin, asyncEnd, addNotification } from './actions'
import { AppThunk } from '../index'
import { NotificationKind } from '../../types/Notification'
import { handleError } from '../../errors'

export const load = <ReturnType>(
  fn: AppThunk<Promise<ReturnType>>,
) => (): AppThunk<Promise<ReturnType | undefined>> => async (dispatch) => {
  dispatch(asyncBegin())

  let result
  try {
    result = await dispatch(fn)
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(addNotification(handleError(error)))
    } else {
      console.log(error)
    }
  }

  dispatch(asyncEnd())

  return result
}
