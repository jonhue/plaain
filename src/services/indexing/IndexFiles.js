import {
  FILE_TYPES,
  SOURCE_EXTENSIONS,
  CAPTION_EXTENSIONS
} from '../../constants'

class IndexFiles {
  constructor(oneDrive, folderId) {
    this._oneDrive = oneDrive
    this._folderId = folderId
  }

  perform() {
    return this.oneDrive.children(this.folderId).then(response => {
      return response.value.map(item => this.index(item))
        .filter(source => source != null)
    })
  }

  index(item) {
    const type = IndexFiles.fileType(item.name)
    if (item.file == null || type == null) {
      return null
    }

    return {
      id: item.id,
      type: type,
      name: item.name,
      extension: IndexFiles.fileExtension(item.name),
      information: IndexFiles.fileInformation(item.name),
      mimeType: item.file.mimeType,
      url: item['@microsoft.graph.downloadUrl']
    }
  }

  static fileType(fileName) {
    if (SOURCE_EXTENSIONS.includes(IndexFiles.fileExtension(fileName))) {
      return FILE_TYPES.SOURCE
    } else if (
      CAPTION_EXTENSIONS.includes(IndexFiles.fileExtension(fileName))
    ) {
      return FILE_TYPES.CAPTION
    } else {
      return null
    }
  }

  static fileExtension(fileName) {
    return fileName.split('.').pop()
  }

  static fileInformation(fileName) {
    return fileName.split('.').shift()
  }

  get oneDrive() {
    return this._oneDrive
  }

  get folderId() {
    return this._folderId
  }
}

export default IndexFiles
