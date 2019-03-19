import { FILE_TYPES, ITEM_ROLES, ITEM_STATES, ITEM_TYPES } from '../../constants'

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

    const files = await new IndexFiles(this.oneDrive, item.id).perform()

    return {
      type: ITEM_TYPES.EPISODE,
      state: ITEM_STATES.INDEXED,
      role: files.filter(file => file.type === FILE_TYPES.SOURCE).length > 0 ? ITEM_ROLES.LIBRARY : ITEM_ROLES.RECOMMENDED,
      id: item.id,
      episodeNumber: Number.parseInt(item.name),
      files: files
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
