import { ConnectedProps, connect } from 'react-redux'
import React, { lazy } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ErrorViewer from '../components/ErrorViewer'
import Loading from './Loading'
import NotFound from './NotFound'
import { RootState } from '../store'
import ScrollToTop from '../components/ScrollToTop'
import Welcome from './Welcome'
import { updateError } from '../store/ui/actions'

const App = lazy(() => import('./app'))

const mapState = (state: RootState) => ({
  error: state.ui.error,
  isLoading: state.ui.isLoading,
})
const mapDispatch = { updateError }
const connector = connect(mapState, mapDispatch)

type BaseProps = ConnectedProps<typeof connector>

export const Base = ({ error, isLoading, updateError }: BaseProps) => {
  const handleErrorClose = () => updateError(undefined)

  return (
    <div className="Base">
      {isLoading && <Loading />}
      <Router basename="/plaain">
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/app" component={App} />
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Router>

      <ErrorViewer error={error} onClose={handleErrorClose} />
    </div>
  )
}

export default connector(Base)
