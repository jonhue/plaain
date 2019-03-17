import TMDb from '../databases/TMDb'

class FetchEpisode {
  constructor(showTmdbId, seasonNumber, episode) {
    this._showTmdbId = showTmdbId
    this._seasonNumber = seasonNumber
    this._episode = episode
    this._tmdb = new TMDb()
  }

  perform() {
    return this.tmdb.episode(this.showTmdbId, this.seasonNumber, this.episode.episodeNumber)
      .then(response => {
        this.episode.airDate = response.air_date
        this.episode.name = response.name
        this.episode.overview = response.overview

        return this.episode
      })
  }

  get showTmdbId() {
    return this._showTmdbId
  }

  get seasonNumber() {
    return this._seasonNumber
  }

  get episode() {
    return this._episode
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchEpisode
