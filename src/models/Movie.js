import GetMovie from './../services/tmdb/GetMovie'
import GetMovieCredits from './../services/tmdb/GetMovieCredits'
import GetMovieVideos from './../services/tmdb/GetMovieVideos'

class Movie {
  constructor(id, video) {
    this._id = id
    this._video = video
  }

  fetch() {
    this.fetchDetails()
    this.fetchCredits()
    this.fetchVideos()

    return this
  }

  fetchDetails() {
    new GetMovie(this.id).perform()
      .then((response) => {
        this._backdrop_path = response.backdrop_path
        this._overview = response.overview
        this._poster_path = response.poster_path
        this._release_date = response.release_date
        this._runtime = response.runtime
        this._title = response.title
      })
      .catch((error) => {
        console.log(error)
      })
  }

  fetchCredits() {
    new GetMovieCredits(this.id).perform()
      .then((response) => {
        this._cast = response.cast.map((cast_member) => {
          return {
            character: cast_member.character,
            name: cast_member.name
          }
        })
        this._crew = response.crew.map((crew_member) => {
          return {
            job: crew_member.job,
            name: crew_member.name
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  fetchVideos() {
    new GetMovieVideos(this.id).perform()
      .then((response) => {
        const videos = response.results.filter((video) => video.type === 'YouTube')
        if (videos.length > 0) {
          this._trailer_key = videos[0].key
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  get backdropUrl() {
    return `https://image.tmdb.org/t/p/original${this._backdrop_path}`
  }

  get crew() {
    return this._crew
  }

  get id() {
    return this._id
  }

  get overview() {
    return this._overview
  }

  get posterURL() {
    return `https://image.tmdb.org/t/p/original${this._poster_path}`
  }

  get releaseDate() {
    return this._release_date
  }

  get runtime() {
    return this._runtime
  }

  get title() {
    return this._title
  }

  get starring() {
    return this._cast
  }

  get trailerUrl() {
    if (this._trailer_key == null) {
      return null
    }

    return `https://www.youtube.com/watch?v=${this._trailer_key}`
  }

  get video() {
    return this._video
  }
}

export default Movie
