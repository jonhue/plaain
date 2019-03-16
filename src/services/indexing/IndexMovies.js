import { ITEM_STATES } from '../../constants'

import IndexFiles from './IndexFiles'

class IndexMovies {
  constructor(oneDrive) {
    this._oneDrive = oneDrive
  }

  perform() {
    return this.oneDrive.movies().then(response => response.value.map((item, index) => {
      if (item.folder == null || item.folder.childCount < 1) {
        return null
      }

      return {
        state: ITEM_STATES.INDEXED,
        id: index,
        name: item.name,
        oneDriveId: item.id,
        files: new IndexFiles(this.oneDrive, item.id).perform()
      }
    }).filter(movie => movie != null))
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexMovies
