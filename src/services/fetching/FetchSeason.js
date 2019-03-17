import TMDb from '../databases/TMDb'

import FetchEpisode from './FetchEpisode'

class FetchSeason {
  constructor(show, season) {
    this._show = show
    this._season = season
    this._tmdb = new TMDb()
  }

  perform() {
    return this.tmdb.season(this.show.tmdbId, this.season.seasonNumber)
      .then(response => this.handleResponse(response))
  }

  async handleResponse(response) {
    this.season.airDate = response.air_date
    this.season.name = response.name
    this.season.overview = response.overview
    this.season.posterUrl = `https://image.tmdb.org/t/p/original${response.poster_path}`
    this.season.affiliateLink = `https://www.amazon.com/s?k=${FetchSeason.parametrize(this.show.name)}+${FetchSeason.parametrize(this.season.name)}&i=movies-tv`
    this.season.episodes = await this.mergeEpisodes(response.episodes)

    return this.season
  }

  async mergeEpisodes(responseEpisodes) {
    let episodes = []
    if (this.season.episodes != undefined) {
      episodes = responseEpisodes.map(episode => ({
        tmdbId: episode.id,
        episodeNumber: episode.episode_number,
        ...this.season.episodes.filter(indexedEpisode => indexedEpisode.episodeNumber === episode.episode_number).shift()
      }))
    } else {
      episodes = responseEpisodes.map(episode => ({
        tmdbId: episode.id,
        episodeNumber: episode.episode_number
      }))
    }

    return await Promise.all(episodes.map(episode => new FetchEpisode(this.show, this.season, episode).perform()))
  }

  get show() {
    return this._show
  }

  get season() {
    return this._season
  }

  get tmdb() {
    return this._tmdb
  }

  static parametrize(string) {
    return string.toLowerCase().replace(/\s/g, '+')
  }
}

export default FetchSeason
