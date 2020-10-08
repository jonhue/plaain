import { ConnectedProps, connect } from 'react-redux'
import React, { lazy } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Loading from './Loading'
import NotFound from './NotFound'
import NotificationsViewer from '../components/notifications/NotificationsViewer'
import { RootState } from '../store'
import ScrollToTop from '../components/ScrollToTop'
import Welcome from './Welcome'
import { removeNotification } from '../store/ui/actions'

const App = lazy(() => import('./app'))
const Player = lazy(() => import('./Player'))

const mapState = (state: RootState) => ({
  isLoading: state.ui.isLoading,
  notifications: state.ui.notifications,
})
const mapDispatch = { removeNotification }
const connector = connect(mapState, mapDispatch)

type BaseProps = ConnectedProps<typeof connector>

const Base = ({ notifications, isLoading, removeNotification }: BaseProps) => (
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

    <NotificationsViewer
      notifications={notifications}
      removeNotification={removeNotification}
    />
  </div>
)

export default connector(Base)
