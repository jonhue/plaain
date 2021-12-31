import { AccPerson } from '../types/items/Person'
import { Movie } from '../types/items/Movie'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'

export const buildMovieSearchKey = (movie: Movie) =>
  [
    movie.title,
    movie.summary,
    movie.crew.map((person) => person.title),
    movie.cast.map((person) => [person.title, person.character]),
  ].toString()

export const buildShowSearchKey = (show: Show, seasons: Season[]) =>
  [
    show.title,
    show.summary,
    seasons.map((season) => [
      season.title,
      season.summary,
      season.crew.map((person) => person.title),
      season.cast.map((person) => [person.title, person.character]),
    ]),
  ].toString()

export const buildPersonSearchKey = (person: AccPerson) =>
  [person.title, person.characters].toString()
