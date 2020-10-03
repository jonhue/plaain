import { Notification, NotificationKind } from '../types/Notification'
import { AuthenticationFailure } from './AuthenticationFailure'
import { CannotFindFileError } from './CannotFindFileError'

export const handleError = (error: Error): Notification => {
  if (error instanceof AuthenticationFailure) {
    return {
      kind: NotificationKind.AuthenticationFailure,
      provider: error.provider,
    }
  } else if (error instanceof CannotFindFileError) {
    return { kind: NotificationKind.CannotFindFile, file: error.file }
  } else {
    return { kind: NotificationKind.GenericError, error }
  }
}
