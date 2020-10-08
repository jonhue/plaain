import { ConnectedProps, connect } from 'react-redux'
import React, { useMemo } from 'react'
import NotFound from '../NotFound'
import Person from '../../components/Person'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import { moviesByPersonSelector } from '../../store/movies/selectors'
import { personSelector } from '../../store/selectors'
import { seasonsByPersonSelector } from '../../store/seasons/selectors'

const mapState = (state: RootState) => ({
  movies: state.movies,
  seasons: state.seasons,
})

const connector = connect(mapState)

interface PersonViewParams {
  id: string
}

type PersonViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<PersonViewParams>

const PersonView = ({ match, movies, seasons }: PersonViewProps) => {
  const person = useMemo(
    () => personSelector(match.params.id)({ movies, seasons }),
    [match, movies, seasons],
  )
  const involvedMovies = useMemo(() => {
    if (person !== undefined) return moviesByPersonSelector(person.id)(movies)
  }, [movies, person])
  const involvedSeasons = useMemo(() => {
    if (person !== undefined) return seasonsByPersonSelector(person.id)(seasons)
  }, [person, seasons])

  return person !== undefined &&
    involvedMovies !== undefined &&
    involvedSeasons !== undefined ? (
    <Person person={person} movies={involvedMovies} seasons={involvedSeasons} />
  ) : (
    <NotFound />
  )
}

export default connector(PersonView)
