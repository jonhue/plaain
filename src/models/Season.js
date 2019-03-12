import GetSeason from './../services/tmdb/GetSeason'

class Season {
  constructor(show_id, season_number) {
    this._show_id = show_id
    this._season_number = season_number
  }

  fetch() {
    new GetSeason(this.showId, this.seasonNumber).perform()
      .then((response) => {
        this._air_date = response.air_date
        this._name = response.name
        this._overview = response.overview
        this._poster_path = response.poster_path
        this._episodes = response.episodes.map((episode) => new Episode(this.showId, this.seasonNumber, episode.episode_number).fetch())
      })
      .catch((error) => {
        console.log(error)
      })

    return this
  }

  get airDate() {
    return this._air_date
  }

  get episodes() {
    return this._episodes
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

  get seasonNumber() {
    return this._season_number
  }

  get showId() {
    return this._show_id
  }
}

export default Season
