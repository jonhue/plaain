import { ITEM_STATES } from '../../constants'

import TMDb from '../databases/TMDb'

class FetchEpisode {
  constructor(show, season, episode) {
    this._show = show
    this._season = season
    this._episode = { ...episode }
    this._tmdb = new TMDb()
  }

  perform() {
    return this.tmdb.episode(this.show.tmdbId, this.season.seasonNumber, this.episode.episodeNumber)
      .then(response => {
        this.episode.state = ITEM_STATES.FETCHED
        this.episode.airDate = response.air_date
        this.episode.name = response.name
        this.episode.overview = response.overview
        this.episode.affiliateLink = `https://www.amazon.com/s?k=${FetchEpisode.parametrize(this.show.name)}+${FetchEpisode.parametrize(this.season.name)}+episode+${this.episode.episodeNumber}&i=movies-tv`

        return this.episode
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

  static parametrize(string) {
    return string.toLowerCase().replace(/\s/g, '+')
  }
}

export default FetchEpisode
