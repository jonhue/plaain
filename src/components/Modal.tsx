import './Modal.scss'
import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

type ModalProps = {
  isActive: boolean
}

export const Modal: FunctionComponent<ModalProps> = ({
  isActive,
  children,
}) => {
  return (
    <div className={classNames('Modal', { active: isActive })}>
      <div className="Modal__wrapper">{children}</div>
    </div>
  )
}

export default Modal
