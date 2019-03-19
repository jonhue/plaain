import { ITEM_ROLES, ITEM_STATES, ITEM_TYPES } from '../../constants'

import IndexSeasons from './IndexSeasons'

class IndexShows {
  constructor(oneDrive) {
    this._oneDrive = oneDrive
  }

  perform() {
    return this.oneDrive.shows().then(response => {
      return response.value.map(item => this.index(item))
    })
  }

  async index(item) {
    if (item.folder == null) {
      return null
    }

    const seasons = await new IndexSeasons(this.oneDrive, item.id).perform()

    return {
      type: ITEM_TYPES.SHOW,
      state: ITEM_STATES.INDEXED,
      role: seasons.filter(season => season.role === ITEM_ROLES.LIBRARY).length > 0 ? ITEM_ROLES.LIBRARY : ITEM_ROLES.RECOMMENDED,
      id: item.id,
      name: item.name,
      seasons: seasons
    }
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexShows
