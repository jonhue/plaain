import './NotificationsViewer.scss'
import React, { useEffect, useState } from 'react'
import { Notification } from '../types/Notification'

type NotificationsViewerProps = {
  notifications: Notification[]

  onClose: () => void
}

export const NotificationsViewer = ({
  notifications,
  onClose,
}: NotificationsViewerProps) => {
  // const [show, setShow] = useState(false)

  // const hide = () => {
  //   onClose()
  //   setShow(false)
  // }

  // useEffect(() => {
  //   setShow(error !== undefined)
  // }, [error])

  return <div className="NotificationsViewer">{notifications}</div>
}

export default NotificationsViewer
