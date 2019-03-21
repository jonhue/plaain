import { ITEM_STATES, ITEM_TYPES } from '../../constants'

import OneDrive from '../drives/OneDrive'

class IndexSeasons {
  constructor(accessToken, showIds) {
    this._oneDrive = new OneDrive(accessToken)
    this._showIds = showIds
  }
  constructor(accessToken) {
    this._oneDrive = new OneDrive(accessToken)
  }

  perform() {
    return [].concat(...this.showIds.map(showId => {
      return await Promise.all(await this.oneDrive.children(showId).then(response => {
        return response.value.map(item => this.index(item, showId))
      })).then(seasons => seasons.filter(season => season != null))
    }))
  }

  async index(item, showId) {
    if (item.folder == null || Number.isNaN(item.name)) {
      return null
    }

    return {
      type: ITEM_TYPES.SEASON,
      state: ITEM_STATES.INDEXED,
      id: item.id,
      seasonNumber: Number.parseInt(item.name),
      showId
    }
  }

  get oneDrive() {
    return this._oneDrive
  }

  get showIds() {
    return this._showIds
  }
}

export default IndexSeasons
