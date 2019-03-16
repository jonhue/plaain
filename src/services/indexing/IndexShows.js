import { ITEM_STATES } from '../../constants'

import IndexFiles from './IndexFiles'

class IndexShows {
  constructor(oneDrive) {
    this._oneDrive = oneDrive
  }

  perform() {
    return this.oneDrive.shows().then(response => {
      return response.value.map((item, index) => this.indexShow(item, index))
    })
  }

  async indexShow(item, id){
    if (item.folder == null || item.folder.childCount < 1) {
      return null
    }

    return {
      state: ITEM_STATES.INDEXED,
      id: id,
      name: item.name,
      oneDriveId: item.id,
      // files: await new IndexFiles(this.oneDrive, item.id).perform()
    }
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexShows
