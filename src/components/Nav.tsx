import './Nav.scss'
import { ForYouIcon } from './icons/Nucleo/ForYouIcon'
import { MovieIcon } from './icons/Nucleo/MovieIcon'
import React from 'react'
import { SettingsIcon } from './icons/Nucleo/SettingsIcon'
import { ShowIcon } from './icons/Nucleo/ShowIcon'
import { Tab } from './Tab'

type NavProps = {
  moviesDisabled?: boolean
  showsDisabled?: boolean
}

export const Nav = ({ moviesDisabled, showsDisabled }: NavProps) => (
  <div className="Nav">
    <Tab to="/app" exact>
      <ForYouIcon />
      <p>For you</p>
    </Tab>
    <Tab disabled={moviesDisabled} to="/app/movies">
      <MovieIcon />
      <p>Movies</p>
    </Tab>
    <Tab disabled={showsDisabled} to="/app/shows">
      <ShowIcon />
      <p>Shows</p>
    </Tab>
    <Tab to="/app/settings">
      <SettingsIcon />
      <p>Settings</p>
    </Tab>
  </div>
)
