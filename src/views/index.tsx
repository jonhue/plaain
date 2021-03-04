import React, { lazy } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Loading from './Loading'
import NotFound from './NotFound'
import NotificationsViewer from '../components/notifications/NotificationsViewer'
import { RootState } from '../store'
import ScrollToTop from '../components/ScrollToTop'
import Welcome from './Welcome'
import { useSelector } from 'react-redux'

const App = lazy(() => import('./app'))
const Player = lazy(() => import('./Player'))

const Base = () => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading)

  return (
    <div className="Base">
      {isLoading && <Loading />}
      <Router basename="/plaain">
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/app" component={App} />
          <Route path="/player" exact component={Player} />
          <Route component={NotFound} />
        </Switch>
      </Router>

      <NotificationsViewer />
    </div>
  )
}

export default Base
