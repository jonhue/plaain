import TMDb from '../databases/TMDb'

import FetchSeason from './FetchSeason'

class FetchShow {
  constructor(show) {
    this._show = {...show}
    this._tmdb = new TMDb()
  }

  perform() {
    return this.tmdb.findShow(this.show.name).then(tmdbId => {
      this.show.tmdbId = tmdbId

      this.fetch()

      return this.show
    })
  }

  async fetch() {
    await this.tmdb.show(this.show.tmdbId)
      .then(response => this.handleResponse(response))
  }

  async handleResponse(response) {
    this.show.backdropUrl = `https://image.tmdb.org/t/p/original${response.backdrop_path}`
    this.show.firstAirDate = response.first_air_date
    this.show.lastAirDate = response.last_air_date
    this.show.name = response.name
    this.show.overview = response.overview
    this.show.posterUrl = `https://image.tmdb.org/t/p/original${response.poster_path}`
    this.show.affiliateLink = `https://www.amazon.com/s?k=${FetchShow.parametrize(this.show.name)}&i=movies-tv`
    this.show.seasons = await this.mergeSeasons(response.seasons)
  }

  async mergeSeasons(responseSeasons) {
    let seasons = responseSeasons.map(season => ({
      tmdbId: season.id,
      seasonNumber: season.season_number,
      ...this.show.seasons.filter(indexedSeason => indexedSeason.seasonNumber === season.season_number).shift()
    }))

    return await Promise.all(seasons.map(season => new FetchSeason(this.show, season).perform()))
  }

  get show() {
    return this._show
  }

  get tmdb() {
    return this._tmdb
  }

  static parametrize(string) {
    return string.toLowerCase().replace(/\s/g, '+')
  }
}

export default FetchShow
