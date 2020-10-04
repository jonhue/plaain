import './Person.scss'
import { ConnectedProps, connect } from 'react-redux'
import { buildBackdropUrl, buildCoverUrl } from '../../util'
import Backdrop from '../../components/Backdrop'
import Cover from '../../components/Cover'
import HorizontalSlide from '../../components/HorizontalSlide'
import { Movie } from '../../types/items/Movie'
import NotFound from '../NotFound'
import React from 'react'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import { Season } from '../../types/items/Season'
import { moviesByPersonSelector } from '../../store/movies/selectors'
import { personSelector } from '../../store/selectors'
import { seasonsByPersonSelector } from '../../store/seasons/selectors'
import { useTranslation } from 'react-i18next'

const mapState = (state: RootState) => ({
  movies: state.movies,
  seasons: state.seasons,
})

const connector = connect(mapState)

interface PersonParams {
  id: string
}

type PersonProps = ConnectedProps<typeof connector> &
  RouteComponentProps<PersonParams>

const findBackdropPath = (
  movies: Movie[],
  seasons: Season[],
): string | undefined => {
  if (movies.length > 0) return movies[0].backdropPath
  else if (seasons.length > 0) return seasons[0].showBackdropPath
}

const Person = ({ match, movies, seasons }: PersonProps) => {
  const { t } = useTranslation()

  const person = personSelector(match.params.id)({ movies, seasons })
  if (person === undefined) return <NotFound />

  const involvedMovies = moviesByPersonSelector(person.id)(movies)
  const involvedSeasons = seasonsByPersonSelector(person.id)(seasons)

  return (
    <div className="Person">
      <Backdrop
        url={buildBackdropUrl(
          findBackdropPath(involvedMovies, involvedSeasons),
        )}
      />
      <div className="Person__details">
        <Cover
          url={buildCoverUrl(person.profilePath)}
          alt="profile"
          width="50%"
        />
        <h1>{person.name}</h1>
        <h5>{t('Known as')}</h5>
        <p>{person.jobs.join(', ')}</p>
      </div>

      {involvedMovies.length > 0 && (
        <div className="Person__movies">
          <h2>{t('Movies')}</h2>
          <HorizontalSlide items={involvedMovies} />
        </div>
      )}

      {involvedSeasons.length > 0 && (
        <div className="Person__seasons">
          <h2>{t('TV seasons')}</h2>
          <HorizontalSlide items={involvedSeasons} />
        </div>
      )}
    </div>
  )
}

export default connector(Person)
