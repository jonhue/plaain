import { File } from '../types/files/File'

export class CannotFindFileError extends Error {
  file: File

  constructor(file: File) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CannotFindFileError)
    }

    this.name = 'CannotFindFileError'
    this.file = file
  }
}
