import GetShow from './../services/tmdb/GetShow'

class Show {
  constructor(id) {
    this._id = id
  }

  fetch() {
    new GetShow(this.id).perform()
      .then((response) => {
        this._backdrop_path = response.backdrop_path
        this._first_air_date = response.first_air_date
        this._last_air_date = response.last_air_date
        this._name = response.name
        this._overview = response.overview
        this._poster_path = response.poster_path
        this._seasons = response.seasons.map((season) => new Season(ths.showId, season.season_number).fetch())
      })
      .catch((error) => {
        console.log(error)
      })

    return this
  }

  get backdropUrl() {
    return `https://image.tmdb.org/t/p/original${this._backdrop_path}`
  }

  get firstAirDate() {
    return this._first_air_date
  }

  get id() {
    return this._id
  }

  get lastAirDate() {
    return this._last_air_date
  }

  get name() {
    return this._name
  }

  get overview() {
    return this._overview
  }

  get posterURL() {
    return `https://image.tmdb.org/t/p/original${this._poster_path}`
  }

  get seasons() {
    return this._seasons
  }
}

export default Show
