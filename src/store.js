import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistedReducer from './reducers'

export default createStore(
  persistedReducer,
  applyMiddleware(thunk)
)
