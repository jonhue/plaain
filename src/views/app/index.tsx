import './index.scss'
import { Route, Routes } from 'react-router-dom'
import { Find } from './Find'
import { Home } from './Home'
import { Movie } from './Movie'
import { Movies } from './Movies'
import { Nav } from '../../components/Nav'
import { NotFound } from '../NotFound'
import { Person } from './Person'
import React from 'react'
import { RootState } from '../../store'
import { Season } from './Season'
import { Settings } from './Settings'
import { Show } from './Show'
import { Shows } from './Shows'
import { useSelector } from 'react-redux'

const App = () => {
  const { moviesCount, showsCount } = useSelector((state: RootState) => ({
    moviesCount: Object.keys(state.movies).length,
    showsCount: Object.keys(state.shows).length,
  }))

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'movies/:id'} element={<Movie />} />
        <Route path={'movies'} element={<Movies />} />
        <Route path={'shows/:id'} element={<Show />} />
        <Route path={'shows'} element={<Shows />} />
        <Route path={'seasons/:id'} element={<Season />} />
        <Route path={'people/:id'} element={<Person />} />
        <Route path={'settings'} element={<Settings />} />
        <Route path={'find'} element={<Find />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Nav
        moviesDisabled={moviesCount === 0}
        showsDisabled={showsCount === 0}
      />
    </div>
  )
}

export default App
