import { ITEM_STATES } from '../../constants'

import TMDb from '../databases/TMDb'
import Parametrize from '../Parametrize'

class FetchMovie {
  constructor(id, name) {
    this._movie = { id, name }
    this._tmdb = new TMDb()
  }

  perform() {
    return this.tmdb.findMovie(this.movie.name)
      .then(tmdbId => this.fetch(tmdbId))
  }

  async fetch(tmdbId) {
    this.movie.tmdbId = tmdbId

    if (this.movie.tmdbId === null) {
      return
    }

    await Promise.all([
      this.fetchDetails(),
      this.fetchCredits()
    ])

    return this.movie
  }

  fetchDetails() {
    return this.tmdb.movie(this.movie.tmdbId)
      .then(response => {
        this.movie.state = ITEM_STATES.FETCHED
        this.movie.backdropUrl =
          `https://image.tmdb.org/t/p/original${response.backdrop_path}`
        this.movie.overview = response.overview
        this.movie.posterUrl =
          `https://image.tmdb.org/t/p/original${response.poster_path}`
        this.movie.releaseDate = response.release_date
        this.movie.runtime = response.runtime
        this.movie.name = response.title
        this.movie.trailerLink =
          'https://www.youtube.com/results?search_query=' +
          `${new Parametrize(this.movie.name).perform()}+official+trailer`
      })
  }

  fetchCredits() {
    return this.tmdb.movieCredits(this.movie.tmdbId)
      .then(response => {
        this.movie.cast = response.cast.map(castMember => ({
          id: castMember.id,
          character: castMember.character,
          name: castMember.name,
          profileUrl: `https://image.tmdb.org/t/p/original${castMember.profile_path}`
        }))
        this.movie.crew = response.crew.map(crewMember => ({
          id: crewMember.id,
          job: crewMember.job,
          name: crewMember.name,
          profileUrl: `https://image.tmdb.org/t/p/original${crewMember.profile_path}`
        }))
      })
  }

  get movie() {
    return this._movie
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchMovie
