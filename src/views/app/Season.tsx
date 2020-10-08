import { ConnectedProps, connect } from 'react-redux'
import React, { useMemo } from 'react'
import NotFound from '../NotFound'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import Season from '../../components/Season'
import { episodesBySeasonSelector } from '../../store/episodes/selectors'
import { seasonSelector } from '../../store/seasons/selectors'
import { showSelector } from '../../store/shows/selectors'
import { sortByNumber } from '../../util'

const mapState = (state: RootState) => ({
  episodes: state.episodes,
  seasons: state.seasons,
  shows: state.shows,
})

const connector = connect(mapState)

interface SeasonViewParams {
  id: string
}

type SeasonViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<SeasonViewParams>

const SeasonView = ({ episodes, match, seasons, shows }: SeasonViewProps) => {
  const season = useMemo(() => seasonSelector(match.params.id)(seasons), [
    match,
    seasons,
  ])
  const show = useMemo(() => {
    if (season !== undefined) return showSelector(season.showId)(shows)
  }, [season, shows])
  const seasonEpisodes = useMemo(() => {
    if (season !== undefined)
      return sortByNumber(
        episodesBySeasonSelector(season.id)(episodes),
        (episode) => episode.number,
      )
  }, [episodes, season])
  const currentEpisode = useMemo(() => {
    if (season !== undefined && seasonEpisodes !== undefined)
      return seasonEpisodes.find(
        (episode) => episode.number === season.usage.progress,
      )
  }, [season, seasonEpisodes])

  return show !== undefined &&
    season !== undefined &&
    seasonEpisodes !== undefined ? (
    <Season
      show={show}
      season={season}
      episodes={seasonEpisodes}
      currentEpisode={currentEpisode}
    />
  ) : (
    <NotFound />
  )
}

export default connector(SeasonView)
