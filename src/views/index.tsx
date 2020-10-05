import { ConnectedProps, connect } from 'react-redux'
import React, { lazy } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Loading from './Loading'
import NotFound from './NotFound'
import NotificationsViewer from '../components/NotificationsViewer'
import { RootState } from '../store'
import Welcome from './Welcome'
import { clearNotifications } from '../store/ui/actions'

const App = lazy(() => import('./app'))
const Player = lazy(() => import('./Player'))

const mapState = (state: RootState) => ({
  isLoading: state.ui.isLoading,
  notifications: state.ui.notifications,
})
const mapDispatch = { clearNotifications }
const connector = connect(mapState, mapDispatch)

type BaseProps = ConnectedProps<typeof connector>

const Base = ({ notifications, isLoading, clearNotifications }: BaseProps) => {
  const handleNotificationViewerClose = () => clearNotifications()

  return (
    <div className="Base">
      {isLoading && <Loading />}
      <Router basename="/plaain">
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/app" component={App} />
          <Route path="/player" exact component={Player} />
          <Route component={NotFound} />
        </Switch>
      </Router>

      <NotificationsViewer
        notifications={notifications}
        onClose={handleNotificationViewerClose}
      />
    </div>
  )
}

export default connector(Base)
