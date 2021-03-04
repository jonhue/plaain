import './i18n.ts'
import './index.scss'
import 'whatwg-fetch'
import React, { Suspense } from 'react'
import Base from './views'
import { Loading } from './views/Loading'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import { register } from './service-worker'
import store from './store'

register()

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
