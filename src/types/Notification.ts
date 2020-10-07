import { Provider, ProviderKind } from './providers/Provider'
import { File } from './files/File'

export enum NotificationKind {
  AuthenticationFailure,
  CannotFindFile,
  GenericError,
  ProviderAlreadyExists,
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

export interface ProviderAlreadyExists {
  kind: NotificationKind.ProviderAlreadyExists
  provider: Provider
}

export type Notification =
  | AuthenticationFailure
  | CannotFindFile
  | GenericError
  | ProviderAlreadyExists
