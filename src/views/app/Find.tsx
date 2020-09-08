import './Find.scss'
import { ConnectedProps, connect } from 'react-redux'
import FlexSearch, { Index } from 'flexsearch'
import React, { useEffect, useState } from 'react'
import HorizontalSlide from '../../components/HorizontalSlide'
import { MediaItem } from '../../types/media_items/MediaItem'
import { Movie } from '../../types/media_items/Movie'
import { RootState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import { Show } from '../../types/media_items/Show'

const QUERY_PARAMETER = 'q'

const buildIndex = <T extends MediaItem>(
  items: T[],
  text: (item: T) => string,
) => {
  const index: Index<number> = FlexSearch.create()
  items.forEach((item) => {
    index.add(item.id, text(item))
  })
  return index
}

const find = <T extends MediaItem>(
  index: Index<number>,
  items: { [id: number]: T | undefined },
  query: string | null,
) => index.search(query || '').then((results) => results.map((id) => items[id]))

const mapState = (state: RootState) => ({
  movies: state.movies,
  shows: state.shows,
})

const connector = connect(mapState)

type FindProps = ConnectedProps<typeof connector> & RouteComponentProps

const Find = ({ history, location, movies, shows }: FindProps) => {
  const moviesIndex = buildIndex(
    Object.values(movies),
    (movie: Movie) => `${movie.title};${movie.summary}`,
  )
  const showsIndex = buildIndex(
    Object.values(shows),
    (show: Show) => `${show.title};${show.summary}`,
  )

  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get(QUERY_PARAMETER),
  )
  const [foundMovies, setFoundMovies] = useState(
    find(moviesIndex, movies, query),
  )
  const [foundShows, setFoundShows] = useState(find(showsIndex, shows, query))

  useEffect(() => {
    setFoundMovies(find(moviesIndex, movies, query))
    setFoundShows(find(showsIndex, shows, query))
  }, [query, foundMovies, foundShows])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    history.replace(`/app/find?${QUERY_PARAMETER}=${event.target.value}`)
    setQuery(event.target.value)
  }

  return (
    <div className="Find">
      <form>
        <input
          autoFocus
          value={query || ''}
          placeholder="Search your library"
          onChange={handleInputChange}
        />
      </form>

      {Object.keys(foundMovies).length > 0 && (
        <section>
          <h2>Movies</h2>
          <HorizontalSlide items={foundMovies} id="movies" />
        </section>
      )}

      {Object.keys(foundShows).length > 0 && (
        <section>
          <h2>TV shows</h2>
          <HorizontalSlide items={foundShows} id="shows" />
        </section>
      )}
    </div>
  )
}

export default connector(Find)
