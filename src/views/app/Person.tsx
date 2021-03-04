import './Person.scss'
import React, { useMemo } from 'react'
import { buildBackdropUrl, buildCoverUrl } from '../../util'
import { Backdrop } from '../../components/Backdrop'
import { Cover } from '../../components/Cover'
import { HorizontalSlide } from '../../components/HorizontalSlide'
import { NotFound } from '../NotFound'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router'
import { moviesByPersonSelector } from '../../store/movies/selectors'
import { personSelector } from '../../store/selectors'
import { seasonsByPersonSelector } from '../../store/seasons/selectors'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface PersonParams {
  id: string
}

type PersonProps = RouteComponentProps<PersonParams>

export const Person = ({ match }: PersonProps) => {
  const { t } = useTranslation()

  const person = useSelector((state: RootState) =>
    personSelector(match.params.id)(state),
  )
  const { movies, seasons } = useSelector((state: RootState) => ({
    movies: person && moviesByPersonSelector(person.id)(state.movies),
    seasons: person && seasonsByPersonSelector(person.id)(state.seasons),
  }))

  const backdropPath = useMemo(() => {
    if (movies !== undefined && movies.length > 0) return movies[0].backdropPath
    else if (seasons !== undefined && seasons.length > 0)
      return seasons[0].showBackdropPath
  }, [movies, seasons])

  return person !== undefined &&
    movies !== undefined &&
    seasons !== undefined ? (
    <div className="Person">
      <Backdrop url={buildBackdropUrl(backdropPath)} />
      <div className="Person__details">
        <Cover url={buildCoverUrl(person.profilePath)} alt="profile" />
        <h1>{person.name}</h1>
        <h5>{t('Known as')}</h5>
        <p>{person.jobs.join(', ')}</p>
      </div>

      {movies.length > 0 && (
        <div className="Person__movies">
          <h2>{t('Movies')}</h2>
          <HorizontalSlide items={movies} id="movies" />
        </div>
      )}

      {seasons.length > 0 && (
        <div className="Person__seasons">
          <h2>{t('TV seasons')}</h2>
          <HorizontalSlide items={seasons} id="seasons" />
        </div>
      )}
    </div>
  ) : (
    <NotFound />
  )
}
