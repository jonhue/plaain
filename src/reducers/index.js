import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth'
import indexing from './indexing'
import movies from './movies'
import shows from './shows'

const rootReducer = combineReducers({
  auth: persistReducer({
    key: 'auth',
    storage: storage,
    whitelist: ['token', 'user'],
    debug: process.env.NODE_ENV === 'development'
  }, auth),
  indexing,
  movies,
  shows
})

export default persistReducer({
  key: 'root',
  storage: storage,
  whitelist: ['movies', 'shows'],
  debug: process.env.NODE_ENV === 'development'
}, rootReducer)
