import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import version from './version'
import auth from './auth'
import settings from './settings'
import indexing from './indexing'
import loading from './loading'
import movies from './movies'
import shows from './shows'
import seasons from './seasons'
import episodes from './episodes'

const rootReducer = combineReducers({
  version,
  auth,
  settings,
  indexing,
  loading,
  movies,
  shows,
  seasons,
  episodes
})

export default persistReducer({
  key: 'root',
  storage: storage,
  whitelist: [
    'version',
    'auth',
    'settings',
    'indexing',
    'movies',
    'shows',
    'seasons',
    'episodes'
  ],
  debug: process.env.NODE_ENV === 'development'
}, rootReducer)
