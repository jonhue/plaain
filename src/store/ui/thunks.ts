import { addNotification, asyncBegin, asyncEnd } from './actions'
import { AppThunk } from '../index'
import { handleError } from '../../errors'

export const load =
  <ReturnType>(
    fn: AppThunk<Promise<ReturnType>>,
  ): AppThunk<Promise<ReturnType | undefined>> =>
  async (dispatch) => {
    dispatch(asyncBegin())

    let result: ReturnType | undefined
    try {
      result = await dispatch(fn)
    } catch (error: unknown) {
      console.error(error) // eslint-disable-line no-console
      if (error instanceof Error) {
        dispatch(addNotification(handleError(error)))
      }
    }

    dispatch(asyncEnd())

    return result
  }
