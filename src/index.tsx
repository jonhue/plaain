import './index.scss'
import 'whatwg-fetch'
import * as serviceWorker from './serviceWorker'
import React, { Suspense } from 'react'
import Base from './views'
import Loading from './views/Loading'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistStore(store)}>
        <Suspense fallback={<Loading />}>
          <Base />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.register()
