import IndexSeasons from './IndexSeasons'

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
      id: id,
      name: item.name,
      oneDriveId: item.id,
      seasons: await new IndexSeasons(this.oneDrive, item.id).perform()
    }
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexShows
