import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth'
import movies from './movies'
import shows from './shows'

export default persistReducer({
  key: 'root',
  storage: storage,
  debug: process.env.NODE_ENV === 'development'
}, combineReducers({ auth, movies, shows }))
