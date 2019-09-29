import { PROVIDERS, ITEM_STATES, ITEM_TYPES } from '../../constants'

import OneDrive from '../drives/OneDrive'

class IndexSeasons {
  constructor(accessToken, showIds) {
    this._oneDrive = new OneDrive(accessToken)
    this._showIds = showIds
  }

  async perform() {
    return [].concat(...await Promise.all(
      this.showIds.map(showId => this.performForShow(showId))
        .filter(season => season != null)
    ))
  }

  async performForShow(showId) {
    return await Promise.all(
      await this.oneDrive.children(showId).then(response => {
        return response.value.map(item => this.index(item, showId))
      })
    )
  }

  async index(item, showId) {
    if (item.folder == null || Number.isNaN(item.name)) {
      return null
    }

    const seasonNumber = Number.parseInt(item.name)

    return {
      provider: PROVIDERS.MICROSOFT,
      type: ITEM_TYPES.SEASON,
      state: ITEM_STATES.INDEXED,
      id: item.id,
      seasonNumber: seasonNumber,
      showId,
      path: `/app/season/${item.id}`
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
