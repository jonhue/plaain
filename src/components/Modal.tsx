import './Modal.scss'
import React, { FunctionComponent, useRef } from 'react'
import classNames from 'classnames'
import useOnClickOutside from 'use-onclickoutside'

type ModalProps = {
  isActive: boolean

  onClose: () => void
}

export const Modal: FunctionComponent<ModalProps> = ({
  isActive,
  onClose,
  children,
}) => {
  const modalRef = useRef(null)
  useOnClickOutside(modalRef, onClose)

  return (
    <div className={classNames('Modal', { active: isActive })}>
      <div className="Modal__wrapper" ref={modalRef}>
        {children}
      </div>
    </div>
  )
}
