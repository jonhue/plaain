import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth'

export default persistReducer({
  key: 'root',
  storage: storage
}, combineReducers({ auth }))
