import { FILE_TYPES, ITEM_STATES, ITEM_TYPES } from '../../constants'

import OneDrive from '../drives/OneDrive'

import IndexFiles from './IndexFiles'

class IndexMovies {
  constructor(accessToken) {
    this._oneDrive = new OneDrive(accessToken)
  }

  async perform() {
    return await Promise.all(await this.oneDrive.movies().then(response => {
      return response.value.map(item => this.index(item))
    })).then(movies => movies.filter(movie => movie != null))
  }

  async index(item) {
    if (item.folder == null) {
      return null
    }

    const files = await new IndexFiles(this.oneDrive, item.id).perform()

    return {
      type: ITEM_TYPES.MOVIE,
      state: ITEM_STATES.INDEXED,
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
