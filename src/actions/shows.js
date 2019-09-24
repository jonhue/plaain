import FetchShow from '../services/fetching/FetchShow'

import { showSelector } from '../selectors/shows'

export const REMOVE_SHOW = 'REMOVE_SHOW'
export const UPDATE_SHOW = 'UPDATE_SHOW'

export const fetchShow = id => {
  return (dispatch, getState) => {
    const show = showSelector(id)(getState())
    return new FetchShow(show.id, show.name).perform().then(fetchedShow => {
      dispatch(updateShow(fetchedShow))
    }).catch(error => console.log(error))
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
