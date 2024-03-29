import React, { lazy } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Loading } from './Loading'
import { NotFound } from './NotFound'
import { NotificationsViewer } from '../components/notifications/NotificationsViewer'
import { RootState } from '../store'
import { ScrollToTop } from '../components/ScrollToTop'
import { Welcome } from './Welcome'
import { useAuthRedirect } from '../hooks/auth'
import { useSelector } from 'react-redux'

const App = lazy(() => import('./app'))
const Player = lazy(() => import('./Player'))

const Base = () => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading)

  useAuthRedirect()

  return (
    <div className="Base">
      {isLoading && <Loading />}
      <Router basename="/plaain">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="app/*" element={<App />} />
          <Route path="player" element={<Player />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <NotificationsViewer />
    </div>
  )
}

export default Base
