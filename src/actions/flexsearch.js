import FlexSearchIndexMovies from '../services/flexsearch/FlexSearchIndexMovies'
import FlexSearchIndexShows from '../services/flexsearch/FlexSearchIndexShows'
import FlexSearchIndexPeople from '../services/flexsearch/FlexSearchIndexPeople'

import { loadingBegin, loadingStop } from './loading'

export const FLEXSEARCH_UPDATE = 'FLEXSEARCH_UPDATE'

export const flexsearchIndex = () => {
  return (dispatch, getState) => {
    console.log('hey')
    dispatch(loadingBegin('Preparing search...'))

    setTimeout(() => {
      return Promise.all([
        new FlexSearchIndexMovies(getState().movies).perform(),
        new FlexSearchIndexShows(getState().shows).perform(),
        new FlexSearchIndexPeople(getState().movies, getState().seasons).perform()
      ]).then(([movies, shows, people]) => {
        console.log('ho')
        dispatch(flexsearchUpdate(movies, shows, people))
        dispatch(loadingStop())
      }).catch(error => console.log(error))
    }, 2000)
  }
}

const flexsearchUpdate = (movies, shows, people) => ({
  type: FLEXSEARCH_UPDATE,
  payload: { movies, shows, people }
})
