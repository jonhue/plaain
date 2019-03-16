import { ITEM_STATES } from '../../constants'

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

    return {
      state: ITEM_STATES.INDEXED,
      id: item.id,
      name: item.name,
      files: await new IndexFiles(this.oneDrive, item.id).perform()
    }
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexMovies
