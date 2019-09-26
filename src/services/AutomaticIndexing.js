import { AUTOMATIC_INDEXING } from '../constants'

class AutomaticIndexing {
  constructor(setting, lastIndexed, indexAction) {
    this._setting = setting
    this._lastIndexed = lastIndexed
    this._indexAction = indexAction
  }

  perform() {
    if (this.setting === AUTOMATIC_INDEXING.NEVER) {
      return false
    }

    if (
      this.setting === AUTOMATIC_INDEXING.ALWAYS ||
      new Date().getFullYear() !== new Date(this.lastIndexed).getFullYear() ||
      new Date().getMonth() !== new Date(this.lastIndexed).getMonth() ||
      (this.setting !== AUTOMATIC_INDEXING.MONTHLY &&
        new Date().getDate() !== new Date(this.lastIndexed).getDate())
    ) {
      this.indexAction()
      return true
    } else {
      return false
    }
  }

  get setting() {
    return this._setting
  }

  get lastIndexed() {
    return this._lastIndexed
  }

  get indexAction() {
    return this._indexAction
  }
}

export default AutomaticIndexing
