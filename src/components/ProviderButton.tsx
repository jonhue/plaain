import './ProviderButton.scss'
import React from 'react'
import classNames from 'classnames'

type ProviderButtonProps = {
  className?: string
  icon: JSX.Element
  title?: string
  disabled?: boolean

  onClick: (event: React.MouseEvent) => void
}

export const ProviderButton = ({
  className,
  icon,
  title,
  disabled,
  onClick,
}: ProviderButtonProps) => (
  <div className={classNames('ProviderButton', { large: title !== undefined })}>
    <button className={className} onClick={onClick} disabled={disabled}>
      {icon}
      {title && <h3>{title}</h3>}
    </button>
  </div>
)
