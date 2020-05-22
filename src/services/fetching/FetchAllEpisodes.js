import { ITEM_TYPES } from '../../constants'

import TMDb from '../databases/TMDb'

class FetchAllEpisodes {
  constructor(seasons) {
    this._seasons = seasons
    this._tmdb = new TMDb()
  }

  async perform() {
    const episodes = await Promise.all(this.seasons.map(async (season) => {
      const response =
        await this.tmdb.season(season.showId, season.seasonNumber)

      return response.episodes.map(episode => ({
        id: `${season.id}-${episode.episode_number}`,
        type: ITEM_TYPES.EPISODE,
        episodeNumber: episode.episode_number,
        seasonId: season.id,
        providerId: null
      }))
    }))

    return episodes.reduce((episodes, arr) => episodes.concat(arr), [])
  }

  get seasons() {
    return this._seasons
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchAllEpisodes
