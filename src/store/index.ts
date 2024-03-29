import { Action, applyMiddleware, createStore } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import auth from './auth/reducers'
import { combineReducers } from 'redux'
import episodes from './episodes/reducers'
import movies from './movies/reducers'
import people from './people/reducers'
import { persistReducer } from 'redux-persist'
import seasons from './seasons/reducers'
import shows from './shows/reducers'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import ui from './ui/reducers'

const rootReducer = combineReducers({
  auth,
  episodes,
  people,
  movies,
  seasons,
  shows,
  ui,
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
    whitelist: ['auth', 'episodes', 'people', 'movies', 'seasons', 'shows'],
    debug: process.env.NODE_ENV === 'development',
  },
  rootReducer,
)

export default createStore(persistedReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export type AppDispatch = ThunkDispatch<RootState, unknown, Action>
