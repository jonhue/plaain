import { ITEM_TYPES } from '../../constants'

import TMDb from '../databases/TMDb'

class FetchAllSeasons {
  constructor(shows) {
    this._shows = shows
    this._tmdb = new TMDb()
  }

  async perform() {
    const seasons = await Promise.all(
      this.shows.map(async show => {
        const response = await this.tmdb.show(show.id)

        return response.seasons.map(season => ({
          id: `${show.id}-${season.season_number}`,
          type: ITEM_TYPES.SEASON,
          seasonNumber: season.season_number,
          showId: show.id,
          providerId: null
        }))
      })
    )

    return seasons.reduce((seasons, arr) => seasons.concat(arr), [])
  }

  get shows() {
    return this._shows
  }

  get tmdb() {
    return this._tmdb
  }
}

export default FetchAllSeasons
