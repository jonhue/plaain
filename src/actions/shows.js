import FetchShow from '../services/fetching/FetchShow'

import { showSelector } from '../selectors/shows'

export const ADD_SHOW = 'ADD_SHOW'
export const CLEAR_SHOWS = 'CLEAR_SHOWS'

export const addShow = show => ({
  type: ADD_SHOW,
  payload: show
})

export const clearShows = () => ({
  type: CLEAR_SHOWS
})

export const fetchShow = showId => {
  return (dispatch, getState) => {
    const show = showSelector(showId)(getState())
    new FetchShow(show).perform().then(newShow => {
      newShow.seasons.forEach(season => {
        season.episodes.forEach(episode => {
          const oldSeason = show.seasons.filter(oldSeason => oldSeason.id === season.id)
          if (oldSeason != null) {
            const oldEpisode = oldSeason.episodes.filter(oldEpisode => oldEpisode.id === episode.id)
            if (oldEpisode != null) {
              episode.progress = oldEpisode.progress
            }
          }
        })
      })
      dispatch(addShow(newShow))
    }).catch(() => dispatch(fetchShow(showId)))
  }
}
