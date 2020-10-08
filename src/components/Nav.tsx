import './Nav.scss'
import GearIcon from './icons/Nucleo/settings-gear'
import MovieIcon from './icons/Nucleo/movie-61'
import PopcornIcon from './icons/Nucleo/popcorn'
import React from 'react'
import ShowIcon from './icons/Nucleo/desktop-screen'
import Tab from './Tab'
import styles from '../_variables.scss'

type NavProps = {
  moviesDisabled?: boolean
  showsDisabled?: boolean
}

const Nav = ({ moviesDisabled, showsDisabled }: NavProps) => (
  <div className="Nav">
    <Tab to="/app" exact>
      <PopcornIcon color={styles.white} />
      <p>For you</p>
    </Tab>
    <Tab disabled={moviesDisabled} to="/app/movies">
      <MovieIcon color={styles.white} />
      <p>Movies</p>
    </Tab>
    <Tab disabled={showsDisabled} to="/app/shows">
      <ShowIcon color={styles.white} />
      <p>Shows</p>
    </Tab>
    <Tab to="/app/settings">
      <GearIcon color={styles.white} />
      <p>Settings</p>
    </Tab>
  </div>
)

export default Nav
