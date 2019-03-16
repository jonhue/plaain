import IndexSeasons from './IndexSeasons'

class IndexShows {
  constructor(oneDrive) {
    this._oneDrive = oneDrive
  }

  perform() {
    return this.oneDrive.shows().then(response => {
      return response.value.map(item => this.index(item))
    })
  }

  async index(item) {
    if (item.folder == null) {
      return null
    }

    return {
      id: item.id,
      name: item.name,
      seasons: await new IndexSeasons(this.oneDrive, item.id).perform()
    }
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexShows
