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
  movies: persistReducer({
    key: 'movies',
    storage: storage,
    debug: process.env.NODE_ENV === 'development'
  }, movies),
  shows: persistReducer({
    key: 'shows',
    storage: storage,
    debug: process.env.NODE_ENV === 'development'
  }, shows),
  seasons: persistReducer({
    key: 'seasons',
    storage: storage,
    debug: process.env.NODE_ENV === 'development'
  }, seasons),
  episodes: persistReducer({
    key: 'episodes',
    storage: storage,
    debug: process.env.NODE_ENV === 'development'
  }, episodes)
})

export default persistReducer({
  key: 'root',
  storage: storage,
  whitelist: ['version', 'auth', 'settings', 'indexing'],
  debug: process.env.NODE_ENV === 'development'
}, rootReducer)
