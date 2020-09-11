import { Provider } from './providers/Provider'

export enum NotificationKind {
  AuthenticationFailure,
  GenericError,
}

interface AuthenticationFailure {
  kind: NotificationKind.AuthenticationFailure
  provider: Provider
  message: string
}

interface GenericError {
  kind: NotificationKind.GenericError
  error: Error
}

export type Notification = AuthenticationFailure | GenericError
