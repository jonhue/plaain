import { Notification, NotificationKind } from '../../types/Notification'
import React, { useCallback } from 'react'
import AuthenticationFailureToast from './AuthenticationFailureToast'
import CannotFindFileToast from './CannotFindFileToast'
import GenericErrorToast from './GenericErrorToast'
import ProviderAlreadyExistsToast from './ProviderAlreadyExistsToast'

type NotificationsViewerProps = {
  notifications: Notification[]

  removeNotification: (notification: Notification) => void
}

export const NotificationsViewer = ({
  notifications,
  removeNotification,
}: NotificationsViewerProps) => {
  const handleClose = useCallback(
    (notification: Notification) => () => removeNotification(notification),
    [removeNotification],
  )

  const renderNotification = useCallback(
    (notification: Notification, index: number): JSX.Element => {
      switch (notification.kind) {
        case NotificationKind.AuthenticationFailure:
          return (
            <AuthenticationFailureToast
              notification={notification}
              onClose={handleClose(notification)}
              key={index}
            />
          )
        case NotificationKind.CannotFindFile:
          return (
            <CannotFindFileToast
              notification={notification}
              onClose={handleClose(notification)}
              key={index}
            />
          )
        case NotificationKind.GenericError:
          return (
            <GenericErrorToast
              notification={notification}
              onClose={handleClose(notification)}
              key={index}
            />
          )
        case NotificationKind.ProviderAlreadyExists:
          return (
            <ProviderAlreadyExistsToast
              notification={notification}
              onClose={handleClose(notification)}
              key={index}
            />
          )
      }
    },
    [handleClose],
  )

  return notifications.length > 0 ? (
    <div className="NotificationsViewer">
      {notifications.map(renderNotification)}
    </div>
  ) : null
}

export default NotificationsViewer
