import { ITEM_ROLES, ITEM_STATES, ITEM_TYPES } from '../../constants'

import IndexFiles from './IndexFiles'

class IndexMovies {
  constructor(oneDrive) {
    this._oneDrive = oneDrive
  }

  perform() {
    return this.oneDrive.movies().then(response => {
      return response.value.map(item => this.index(item))
    })
  }

  async index(item) {
    if (item.folder == null) {
      return null
    }

    const files = await new IndexFiles(this.oneDrive, item.id).perform()

    return {
      type: ITEM_TYPES.MOVIE,
      state: ITEM_STATES.INDEXED,
      role: files.length > 0 ? ITEM_ROLES.LIBRARY : ITEM_ROLES.RECOMMENDED,
      id: item.id,
      name: item.name,
      files: files
    }
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexMovies
