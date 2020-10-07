import { Notification, NotificationKind } from '../types/Notification'
import { AuthenticationFailure } from './AuthenticationFailure'
import { CannotFindFileError } from './CannotFindFileError'
import { ProviderAlreadyExists } from './ProviderAlreadyExists'

export const handleError = (error: Error): Notification => {
  if (error instanceof AuthenticationFailure) {
    return {
      kind: NotificationKind.AuthenticationFailure,
      provider: error.provider,
    }
  } else if (error instanceof CannotFindFileError) {
    return { kind: NotificationKind.CannotFindFile, file: error.file }
  } else if (error instanceof ProviderAlreadyExists) {
    return {
      kind: NotificationKind.ProviderAlreadyExists,
      provider: error.provider,
    }
  } else {
    return { kind: NotificationKind.GenericError, error }
  }
}
