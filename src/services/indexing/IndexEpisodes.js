import { ITEM_STATES, ITEM_TYPES } from '../../constants'

import OneDrive from '../drives/OneDrive'

import IndexFiles from './IndexFiles'

class IndexEpisodes {
  constructor(accessToken, seasonIds) {
    this._oneDrive = new OneDrive(accessToken)
    this._seasonIds = seasonIds
  }

  async perform() {
    return [].concat(...await Promise.all(this.seasonIds.map(seasonId => this.performForSeason(seasonId)).filter(episode => episode != null)))
  }

  async performForSeason(seasonId) {
    return await Promise.all(await this.oneDrive.children(seasonId).then(response => {
      return response.value.map(item => this.index(item, seasonId))
    }))
  }

  async index(item, seasonId) {
    if (item.folder == null || Number.isNaN(item.name)) {
      return null
    }

    const files = await new IndexFiles(this.oneDrive, item.id).perform()

    return {
      type: ITEM_TYPES.EPISODE,
      state: ITEM_STATES.INDEXED,
      id: item.id,
      episodeNumber: Number.parseInt(item.name),
      files: files,
      seasonId
    }
  }

  get oneDrive() {
    return this._oneDrive
  }

  get seasonIds() {
    return this._seasonIds
  }
}

export default IndexEpisodes
