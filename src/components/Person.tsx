import './Person.scss'
import React, { useMemo } from 'react'
import { buildBackdropUrl, buildCoverUrl } from '../util'
import { AccPerson } from '../types/items/Person'
import Backdrop from './Backdrop'
import Cover from './Cover'
import HorizontalSlide from './HorizontalSlide'
import { Movie } from '../types/items/Movie'
import { Season } from '../types/items/Season'
import { useTranslation } from 'react-i18next'

type PersonProps = {
  person: AccPerson
  movies: Movie[]
  seasons: Season[]
}

const Person = ({ person, movies, seasons }: PersonProps) => {
  const { t } = useTranslation()

  const backdropPath = useMemo(() => {
    if (movies.length > 0) return movies[0].backdropPath
    else if (seasons.length > 0) return seasons[0].showBackdropPath
  }, [movies, seasons])

  return (
    <div className="Person">
      <Backdrop url={buildBackdropUrl(backdropPath)} />
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

      {movies.length > 0 && (
        <div className="Person__movies">
          <h2>{t('Movies')}</h2>
          <HorizontalSlide items={movies} />
        </div>
      )}

      {seasons.length > 0 && (
        <div className="Person__seasons">
          <h2>{t('TV seasons')}</h2>
          <HorizontalSlide items={seasons} />
        </div>
      )}
    </div>
  )
}

export default Person
