import { ITEM_STATES, ITEM_TYPES } from '../../constants'

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
      state: ITEM_STATES.INDEXED,
      type: seasons.length > 0 ? ITEM_TYPES.LIBRARY : ITEM_TYPES.RECOMMENDED,
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
