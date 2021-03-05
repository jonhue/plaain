import './ProviderButton.scss'
import React from 'react'
import classNames from 'classnames'

type ProviderButtonProps = {
  className?: string
  icon: JSX.Element
  title?: string

  onClick: (event: React.MouseEvent) => void
}

export const ProviderButton = ({
  className,
  icon,
  title,
  onClick,
}: ProviderButtonProps) => (
  <div className={classNames('ProviderButton', { large: title !== undefined })}>
    <button className={className} onClick={onClick}>
      {icon}
      {title && <h3>{title}</h3>}
    </button>
  </div>
)
