import { ITEM_STATES } from '../../constants'

// import IndexFiles from './IndexFiles'

class IndexShows {
  constructor(oneDrive) {
    this._oneDrive = oneDrive
  }

  perform() {
    return this.oneDrive.shows().then(response => response.value.map((item, index) => {
      console.log(item)
      if (item.folder == null || item.folder.childCount < 1) {
        return null
      }

      return {
        state: ITEM_STATES.INDEXED,
        id: index,
        name: item.name,
        oneDriveId: item.id,
        // files: new IndexFiles(this.oneDrive, item.id).perform()
      }
    }).filter(show => show != null))
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexShows
