import FetchShow from '../services/fetching/FetchShow'

export const REMOVE_SHOW = 'REMOVE_SHOW'
export const UPDATE_SHOW = 'UPDATE_SHOW'

export const fetchShow = show => {
  return dispatch => {
    return new FetchShow(show).perform().then(fetchedShow => {
      dispatch(updateShow(fetchedShow))
    }).catch(() => dispatch(fetchShow(show)))
  }
}

export const removeShow = id => ({
  type: REMOVE_SHOW,
  payload: id
})

export const updateShow = show => ({
  type: UPDATE_SHOW,
  payload: show
})
