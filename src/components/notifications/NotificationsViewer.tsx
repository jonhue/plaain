import { Notification, NotificationKind } from '../../types/Notification'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import APIErrorToast from './APIErrorToast'
import AuthenticationFailureToast from './AuthenticationFailureToast'
import CannotFindFileToast from './CannotFindFileToast'
import GenericErrorToast from './GenericErrorToast'
import ProviderAlreadyExistsToast from './ProviderAlreadyExistsToast'
import { RootState } from '../../store'
import { removeNotification } from '../../store/ui/actions'

export const NotificationsViewer = () => {
  const dispatch = useDispatch()

  const notifications = useSelector(
    (state: RootState) => state.ui.notifications,
  )

  const handleClose = useCallback(
    (notification: Notification) => () =>
      dispatch(removeNotification(notification)),
    [removeNotification],
  )

  const renderNotification = useCallback(
    (notification: Notification, index: number): JSX.Element => {
      switch (notification.kind) {
        case NotificationKind.APIError:
          return (
            <APIErrorToast
              notification={notification}
              onClose={handleClose(notification)}
              key={index}
            />
          )
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
