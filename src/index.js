import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import * as serviceWorker from './serviceWorker'

import BaseWrapper from './BaseWrapper'
import Loading from './scenes/Loading'

import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading caption='Loading...' />} persistor={persistStore(store)}>
      <BaseWrapper />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
