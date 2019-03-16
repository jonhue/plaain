import { ITEM_STATES } from '../../constants'

import IndexFiles from './IndexFiles'

class IndexEpisodes {
  constructor(oneDrive, folderId) {
    this._oneDrive = oneDrive
    this._folderId = folderId
  }

  perform() {
    return this.oneDrive.children(this.folderId).then(response => {
      return response.value.map(item => this.index(item))
    }).then(episodes => {
      return Promise.all(episodes).then(episodes => episodes.filter(episode => episode != null))
    })
  }

  async index(item) {
    if (item.folder == null || Number.isNaN(item.name)) {
      return null
    }

    return {
      state: ITEM_STATES.INDEXED,
      id: item.id,
      episodeNumber: Number.parseInt(item.name),
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
