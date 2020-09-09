import './Person.scss'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import NotFound from '../NotFound'
import Backdrop from '../../components/Backdrop'
import Cover from '../../components/Cover'
import HorizontalSlide from '../../components/HorizontalSlide'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from '../../store'
import { personSelector } from '../../store/selectors'
import { moviesByPersonSelector } from '../../store/movies/selectors'
import { seasonsByPersonSelector } from '../../store/seasons/selectors'
import { Movie } from '../../types/items/Movie'
import { Season } from '../../types/items/Season'

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

const Person = ({ match, movies, seasons }: PersonProps) => {
  const person = personSelector(match.params.id)({ movies, seasons })
  if (person === undefined) return <NotFound />

  const involvedMovies = moviesByPersonSelector(person.id)(movies)
  const involvedSeasons = seasonsByPersonSelector(person.id)(seasons)

  return (
    <div className="Person">
      <Backdrop url={(involvedMovies[0] || involvedSeasons[0]).backdropUrl} />
      <div className="Person__details">
        <Cover url={person.profileUrl} alt="profile" width="50%" />
        <h1>{person.name}</h1>
        <h5>Known as</h5>
        <p>{person.jobs.join(', ')}</p>
      </div>

      {involvedMovies.length > 0 && (
        <div className="Person__movies">
          <h2>Movies</h2>
          <HorizontalSlide items={involvedMovies} />
        </div>
      )}

      {involvedSeasons.length > 0 && (
        <div className="Person__seasons">
          <h2>TV seasons</h2>
          <HorizontalSlide items={involvedSeasons} />
        </div>
      )}
    </div>
  )
}

export default connector(Person)
