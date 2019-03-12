import GetEpisode from './../services/tmdb/GetEpisode'

class Episode {
  constructor(show_id, season_number, episode_number, video = null) {
    this._show_id = show_id
    this._season_number = season_number
    this._episode_number = episode_number
    this._video = video
  }

  fetch() {
    new GetEpisode(this.showId, this.seasonNumber, this.episodeNumber).perform()
      .then((response) => {
        this._air_date = response.air_date
        this._name = response.name
        this._overview = response.overview
      })
      .catch((error) => {
        console.log(error)
      })

    return this
  }

  get airDate() {
    return this._air_date
  }

  get episodeNumber() {
    return this._episode_number
  }

  get name() {
    return this._name
  }

  get overview() {
    return this._overview
  }

  get seasonNumber() {
    return this._season_number
  }

  get showId() {
    return this._show_id
  }

  get video() {
    return this._video
  }
}

export default Episode
