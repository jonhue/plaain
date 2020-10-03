import { FileProvider } from './files/providers/FileProvider'
import { ProviderKind } from './providers/Provider'

export enum NotificationKind {
  AuthenticationFailure,
  CannotFindFile,
  GenericError,
}

interface AuthenticationFailure {
  kind: NotificationKind.AuthenticationFailure
  provider: ProviderKind
}

interface CannotFindFile {
  kind: NotificationKind.CannotFindFile
  file: FileProvider
}

interface GenericError {
  kind: NotificationKind.GenericError
  error: Error
}

export type Notification = AuthenticationFailure | CannotFindFile | GenericError
