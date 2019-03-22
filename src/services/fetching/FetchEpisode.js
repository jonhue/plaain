import { ITEM_STATES } from '../../constants'

import TMDb from '../databases/TMDb'

class FetchEpisode {
  constructor(showTmdbId, showName, seasonNumber, seasonName, id, episodeNumber) {
    this._show = { tmdbId: showTmdbId, name: showName }
    this._season = { seasonNumber, name: seasonName }
    this._episode = { id, episodeNumber }
    this._tmdb = new TMDb()
  }

  async perform() {
    await Promise.all([
      this.fetchDetails()
    ])

    return this.episode
  }

  fetchDetails() {
    return this.tmdb.episode(this.show.tmdbId, this.season.seasonNumber, this.episode.episodeNumber)
      .then(response => {
        this.episode.state = ITEM_STATES.FETCHED
        this.episode.airDate = response.air_date
        this.episode.name = response.name
        this.episode.overview = response.overview
      })
  }

  get show() {
    return this._show
  }

  get season() {
    return this._season
  }

  get episode() {
    return this._episode
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchEpisode
