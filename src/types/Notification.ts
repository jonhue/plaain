import { Provider } from './providers/Provider'

enum NotificationKind {
  AuthenticationFailure,
}

interface AuthenticationFailure {
  kind: NotificationKind.AuthenticationFailure
  provider: Provider
  message: string
}

export type Notification = AuthenticationFailure
