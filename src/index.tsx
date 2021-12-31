import './i18n.ts'
import './index.scss'
import 'swiper/scss'
import 'whatwg-fetch'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import React, { Suspense } from 'react'
import Base from './views'
import { Loading } from './views/Loading'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import reportWebVitals from './reportWebVitals'
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log) // eslint-disable-line no-console
