import { isInProgress, wasRecentlyWatched } from '../../util'
import { Person } from '../../types/items/Person'
import { RECENTLY_WATCHED_THRESHOLD } from '../../constants'
import { Season } from '../../types/items/Season'
import { SeasonsState } from './types'
import { createSelector } from 'reselect'

export const seasonSelector = (id: string) => (state: SeasonsState) => state[id]

export const seasonsSelector = (state: SeasonsState) =>
  Object.keys(state).map((id) => state[id]!)

export const inProgressSelector = (state: SeasonsState) =>
  seasonsSelector(state).filter(isInProgress)

export const recentlyWatchedSelector = (state: SeasonsState) =>
  seasonsSelector(state).filter((season) =>
    wasRecentlyWatched(season, RECENTLY_WATCHED_THRESHOLD),
  )

export const seasonsByShowSelector = (showId: string) =>
  createSelector(seasonsSelector, (seasons) =>
    seasons.filter((season) => season.showId === showId),
  )

export const seasonsByPersonSelector = (id: string) =>
  createSelector(seasonsSelector, (seasons) =>
    seasons.filter(
      (season) =>
        season.cast.find((person) => person.id === id) ||
        season.crew.find((person) => person.id === id),
    ),
  )

export const seasonsPersonSelector = (
  id: string,
  fn: (season: Season) => Person[],
) =>
  createSelector(seasonsSelector, (seasons) =>
    seasons
      .map(fn)
      .reduce((acc, people) => acc.concat(people), [])
      .filter((person) => person.id === id),
  )
