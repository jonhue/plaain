import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

import App from './scenes/App'
import Home from './scenes/Home'
import NotFound from './scenes/NotFound'

import './index.scss'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/app" component={App} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
