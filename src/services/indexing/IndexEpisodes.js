import { ITEM_STATES } from '../../constants'

import IndexFiles from './IndexFiles'

class IndexEpisodes {
  constructor(oneDrive, folderId) {
    this._oneDrive = oneDrive
    this._folderId = folderId
  }

  perform() {
    return this.oneDrive.children(this.folderId).then(response => {
      return response.value.map((item, index) => this.indexSeason(item, index))
    })
  }

  async indexSeason(item, id){
    if (item.folder == null || item.folder.childCount < 1 || Number.isNaN(item.name)) {
      return null
    }

    return {
      state: ITEM_STATES.INDEXED,
      id: id,
      episodeNumber: Number.parseInt(item.name),
      oneDriveId: item.id,
      files: await new IndexFiles(this.oneDrive, item.id).perform()
    }
  }

  get oneDrive() {
    return this._oneDrive
  }

  get folderId() {
    return this._folderId
  }
}

export default IndexEpisodes
