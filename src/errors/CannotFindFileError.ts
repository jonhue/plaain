import { FileProvider } from "../types/files/providers/FileProvider"

export class CannotFindFileError extends Error {
  file: FileProvider

  constructor(file: FileProvider, ...args: any[]) {
    super(...args)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CannotFindFileError)
    }

    this.name = 'CannotFindFileError'
    this.file = file
  }
}
