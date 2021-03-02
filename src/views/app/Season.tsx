import React, { useMemo } from 'react'
import NotFound from '../NotFound'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import Season from '../../components/Season'
import { episodesBySeasonSelector } from '../../store/episodes/selectors'
import { seasonSelector } from '../../store/seasons/selectors'
import { showSelector } from '../../store/shows/selectors'
import { sortByNumber } from '../../util'
import { useSelector } from 'react-redux'

interface SeasonViewParams {
  id: string
}

type SeasonViewProps = RouteComponentProps<SeasonViewParams>

const SeasonView = ({ match }: SeasonViewProps) => {
  const season = useSelector((state: RootState) =>
    seasonSelector(match.params.id)(state.seasons),
  )
  const { show, seasonEpisodes } = useSelector((state: RootState) => ({
    show: season && showSelector(season.showId)(state.shows),
    seasonEpisodes:
      season &&
      sortByNumber(
        episodesBySeasonSelector(season.id)(state.episodes),
        (episode) => episode.number,
      ),
  }))
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

export default SeasonView
