import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import version from './version'
import auth from './auth'
import indexing from './indexing'
import loading from './loading'
import movies from './movies'
import shows from './shows'
import seasons from './seasons'
import episodes from './episodes'

const rootReducer = combineReducers({
  version,
  auth: persistReducer({
    key: 'auth',
    storage: storage,
    whitelist: ['token'],
    debug: process.env.NODE_ENV === 'development'
  }, auth),
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
  whitelist: ['version', 'movies', 'shows'],
  debug: process.env.NODE_ENV === 'development'
}, rootReducer)
