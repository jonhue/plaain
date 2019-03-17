import TMDb from '../databases/TMDb'

class FetchEpisode {
  constructor(season) {
    this._season = episode
    this._tmdb = new TMDb()
  }

  perform() {
    this.tmdb.episode(this.episode.tmdbId)
      .then(response => {
        this.episode.airDate = response.air_date
        this.episode.name = response.name
        this.episode.overview = response.overview

        return this.episode
      })
  }

  get episode() {
    return this._episode
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchEpisode
