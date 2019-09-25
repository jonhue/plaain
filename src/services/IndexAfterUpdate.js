import { VERSION } from '../constants'

class IndexAfterUpdate {
  constructor(versionUsedForLastIndex, indexAction) {
    this._versionUsedForLastIndex = versionUsedForLastIndex
    this._indexAction = indexAction
  }

  perform() {
    if (this.versionUsedForLastIndex !== VERSION) {
      this.indexAction('Updating app...')
      return true
    } else {
      return false
    }
  }

  get versionUsedForLastIndex() {
    return this._versionUsedForLastIndex
  }

  get indexAction() {
    return this._indexAction
  }
}

export default IndexAfterUpdate
