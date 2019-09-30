import { PROVIDERS } from '../../constants'

import OneDrive from '../drives/OneDrive'

import IndexFiles from './IndexFiles'

class IndexEpisodes {
  constructor(accessToken, seasons, episodes) {
    this._oneDrive = new OneDrive(accessToken)
    this._seasons = seasons
    this._episodes = episodes
  }

  async perform() {
    return [].concat(...await Promise.all(
      this.seasons.map(season => this.performForSeason(season, this.episodes))
    ))
  }

  async performForSeason(season, episodes) {
    if (season.providerId) {
      return await this.oneDrive.children(season.providerId)
        .then(response => this.handleResponse(response, season, episodes))
    } else {
      return episodes.filter(episode => episode.seasonId === season.id)
    }
  }

  async handleResponse(response, season, episodes) {
    return await Promise.all(
      episodes.filter(episode => episode.seasonId === season.id)
        .map(episode => {
          return this.index(
            episode,
            response.value.find(item => {
              return episode.id === `${season.id}-${Number.parseInt(item.name)}`
            })
          )
        })
    )
  }

  async index(episode, item) {
    if (item) {
      const files = await new IndexFiles(this.oneDrive, item.id).perform()
      return {
        ...episode,
        provider: PROVIDERS.MICROSOFT,
        providerId: item.id,
        files: files
      }
    } else {
      return episode
    }
  }

  get oneDrive() {
    return this._oneDrive
  }

  get seasons() {
    return this._seasons
  }

  get episodes() {
    return this._episodes
  }
}

export default IndexEpisodes
