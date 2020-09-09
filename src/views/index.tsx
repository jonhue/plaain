import { ConnectedProps, connect } from 'react-redux'
import React, { lazy, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NotificationsViewer from '../components/NotificationsViewer'
import Loading from './Loading'
import NotFound from './NotFound'
import { RootState } from '../store'
import ScrollToTop from '../components/ScrollToTop'
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
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/app" component={App} />
            <Route path="/player" exact component={Player} />
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Router>

      <NotificationsViewer
        notifications={notifications}
        onClose={handleNotificationViewerClose}
      />
    </div>
  )
}

export default connector(Base)
