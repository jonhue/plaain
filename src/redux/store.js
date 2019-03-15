import { createStore } from 'redux'
import persistedReducer from './reducers'

export default createStore(persistedReducer)
