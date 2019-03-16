import IndexEpisodes from './IndexEpisodes'

class IndexSeasons {
  constructor(oneDrive, folderId) {
    this._oneDrive = oneDrive
    this._folderId = folderId
  }

  perform() {
    return this.oneDrive.children(this.folderId).then(response => {
      return response.value.map((item, index) => this.indexSeason(item, index))
    })
  }

  async indexSeason(item, id) {
    if (item.folder == null || item.folder.childCount < 1 || Number.isNaN(item.name)) {
      return null
    }

    return {
      id: id,
      seasonNumber: Number.parseInt(item.name),
      oneDriveId: item.id,
      episodes: await new IndexEpisodes(this.oneDrive, item.id).perform().then(episodes => Promise.all(episodes).then(episodes => episodes.filter(episode => episode != null)))
    }
  }

  get oneDrive() {
    return this._oneDrive
  }

  get folderId() {
    return this._folderId
  }
}

export default IndexSeasons
