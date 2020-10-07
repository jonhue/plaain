export class APIError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError)
    }

    this.name = 'APIError'
    this.status = status
  }
}
