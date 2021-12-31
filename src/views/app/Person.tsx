import './Person.scss'
import React, { useMemo } from 'react'
import { buildBackdropUrl, buildCoverUrl, buildJobTitle } from '../../util'
import { Backdrop } from '../../components/Backdrop'
import { Cover } from '../../components/Cover'
import { HorizontalSlide } from '../../components/HorizontalSlide'
import { NotFound } from '../NotFound'
import { RootState } from '../../store'
import { moviesByPersonSelector } from '../../store/movies/selectors'
import { personSelector } from '../../store/selectors'
import { seasonsByPersonSelector } from '../../store/seasons/selectors'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const Person = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const person = useSelector((state: RootState) => personSelector(id!)(state))
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
        <div className="Person__details__wrapper">
          <h1>{person.name}</h1>
          {person.jobs && (
            <p>
              {person.jobs
                .map((job) => buildJobTitle(t, job, person.gender))
                .join(', ')}
            </p>
          )}
        </div>
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
