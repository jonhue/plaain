import { ITEM_TYPES } from '../../constants'

import TMDb from '../databases/TMDb'

class FetchAllEpisodes {
  constructor(seasons) {
    this._seasons = seasons
    this._tmdb = new TMDb()
  }

  async perform() {
    return [].concat(...await Promise.all(
      this.seasons.map(season => {
        return this.tmdb.season(season.showId, season.seasonNumber)
          .then(response => {
            return response.episodes.map(episode => ({
              id: `${season.id}-${episode.episode_number}`,
              type: ITEM_TYPES.EPISODE,
              episodeNumber: episode.episode_number,
              seasonId: season.id,
              providerId: null
            }))
          })
      })
    ))
  }

  get seasons() {
    return this._seasons
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchAllEpisodes
