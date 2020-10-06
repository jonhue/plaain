import { File } from './files/File'
import { ProviderKind } from './providers/Provider'

export enum NotificationKind {
  AuthenticationFailure,
  CannotFindFile,
  GenericError,
}

export interface AuthenticationFailure {
  kind: NotificationKind.AuthenticationFailure
  provider: ProviderKind
}

export interface CannotFindFile {
  kind: NotificationKind.CannotFindFile
  file: File
}

export interface GenericError {
  kind: NotificationKind.GenericError
  error: Error
}

export type Notification = AuthenticationFailure | CannotFindFile | GenericError
