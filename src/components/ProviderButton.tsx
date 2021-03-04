import './ProviderButton.scss'
import React from 'react'

type ProviderButtonProps = {
  className?: string
  icon: JSX.Element

  onClick: (event: React.MouseEvent) => void
}

export const ProviderButton = ({
  className,
  icon,
  onClick,
}: ProviderButtonProps) => (
  <div className="ProviderButton">
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  </div>
)
