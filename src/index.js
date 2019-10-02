import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import * as serviceWorker from './serviceWorker'

import App from './App'
import Welcome from './scenes/Welcome'
import NotFound from './scenes/NotFound'
import Loading from './scenes/Loading'

import ScrollToTop from './components/ScrollToTop'

import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading caption='Loading...' />} persistor={persistStore(store)}>
      <Router basename='/plaain'>
        <ScrollToTop>
          <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/app' component={App} />
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
