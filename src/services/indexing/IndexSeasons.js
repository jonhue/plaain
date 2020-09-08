import { PROVIDERS } from '../../constants'

import OneDrive from '../drives/OneDrive'

class IndexSeasons {
  constructor(accessToken, shows, seasons) {
    this._oneDrive = new OneDrive(accessToken)
    this._shows = shows
    this._seasons = seasons
  }

  async perform() {
    const seasons = await Promise.all(
      this.shows.map((show) => this.performForShow(show, this.seasons)),
    )

    return seasons.reduce((seasons, arr) => seasons.concat(arr), [])
  }

  async performForShow(show, seasons) {
    return await this.oneDrive.children(show.providerId).then((response) => {
      return seasons
        .filter((season) => season.showId === show.id)
        .map((season) => {
          const item = response.value.find((item) => {
            return season.id === `${show.id}-${Number.parseInt(item.name)}`
          })

          if (item) {
            return {
              ...season,
              provider: PROVIDERS.MICROSOFT,
              providerId: item.id,
            }
          } else {
            return season
          }
        })
    })
  }

  get oneDrive() {
    return this._oneDrive
  }

  get shows() {
    return this._shows
  }

  get seasons() {
    return this._seasons
  }
}

export default IndexSeasons
