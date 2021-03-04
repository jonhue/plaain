import NotFound from '../NotFound'
import Person from '../../components/Person'
import React from 'react'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import { moviesByPersonSelector } from '../../store/movies/selectors'
import { personSelector } from '../../store/selectors'
import { seasonsByPersonSelector } from '../../store/seasons/selectors'
import { useSelector } from 'react-redux'

interface PersonViewParams {
  id: string
}

type PersonViewProps = RouteComponentProps<PersonViewParams>

const PersonView = ({ match }: PersonViewProps) => {
  const person = useSelector((state: RootState) =>
    personSelector(match.params.id)(state),
  )
  const { involvedMovies, involvedSeasons } = useSelector(
    (state: RootState) => ({
      involvedMovies: person && moviesByPersonSelector(person.id)(state.movies),
      involvedSeasons:
        person && seasonsByPersonSelector(person.id)(state.seasons),
    }),
  )

  return person !== undefined &&
    involvedMovies !== undefined &&
    involvedSeasons !== undefined ? (
    <Person person={person} movies={involvedMovies} seasons={involvedSeasons} />
  ) : (
    <NotFound />
  )
}

export default PersonView
