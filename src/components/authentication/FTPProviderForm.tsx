import './FTPProviderForm.scss'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CheckIcon } from '../icons/Nucleo/CheckIcon'
import { FTP } from '../../types/providers/FTP'
import { FTPAuthSetup } from '../../services/auth/types'
import { ProviderKind } from '../../types/providers/Provider'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

type FTPProviderFormProps = {
  submitCaption: string
  provider?: FTP

  onSubmit: (config: FTPAuthSetup) => void
}

type FTPProviderFormState = {
  name?: string
  host?: string
  port?: number
  username?: string
  password?: string
  secure: boolean
}

export const FTPProviderForm = ({
  submitCaption,
  provider,
  onSubmit,
}: FTPProviderFormProps) => {
  const { t } = useTranslation()

  const initalState = useMemo<FTPProviderFormState>(
    () => ({
      name: provider?.name,
      host: provider?.host,
      port: provider?.port || 21,
      username: provider?.username,
      password: provider?.password,
      secure: provider?.secure || true,
    }),
    [provider],
  )
  const [state, setState] = useState<FTPProviderFormState>(initalState)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const target = event.currentTarget
      setState((state) => ({
        ...state,
        [target.name]:
          target.type === 'checkbox'
            ? target.checked
            : target.value === ''
              ? undefined
              : target.value,
      }))
    },
    [setState],
  )

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      onSubmit({
        kind: ProviderKind.FTP,
        name: state.name!,
        host: state.host!,
        port: state.port!,
        username: state.username!,
        password: state.password!,
        secure: state.secure,
      })
    },
    [onSubmit, state],
  )

  const isSetupInput = useCallback(
    (value: unknown | undefined) => value !== undefined && value !== '',
    [],
  )

  const isValid = useMemo(
    () =>
      isSetupInput(state.name) &&
      isSetupInput(state.host) &&
      isSetupInput(state.port) &&
      isSetupInput(state.username) &&
      isSetupInput(state.password),
    [isSetupInput, state],
  )

  useEffect(() => {
    setState(initalState)
  }, [initalState, setState])

  return (
    <form className="FTPProviderForm" onSubmit={handleSubmit}>
      <label>
        {t('Name')}
        <p className="small">
          {t('Friendly name to identify server, not used for connecting.')}
        </p>
        <div
          className={classNames('FTPProviderForm__input', 'warn', {
            valid: isSetupInput(state.name),
          })}
        >
          <input
            type="text"
            name="name"
            value={state.name || ''}
            onChange={handleChange}
          />
          <CheckIcon />
        </div>
      </label>

      <label>
        {t('Host')}
        <div
          className={classNames('FTPProviderForm__input', 'warn', {
            valid: isSetupInput(state.host),
          })}
        >
          <input
            type="text"
            name="host"
            value={state.host || ''}
            placeholder="example.com"
            onChange={handleChange}
          />
          <CheckIcon />
        </div>
      </label>

      <label>
        {t('Port')}
        <div
          className={classNames('FTPProviderForm__input', 'warn', {
            valid: isSetupInput(state.port),
          })}
        >
          <input
            type="number"
            min={0}
            step={1}
            name="port"
            value={state.port || ''}
            onChange={handleChange}
          />
          <CheckIcon />
        </div>
      </label>

      <label>
        {t('Username')}
        <div
          className={classNames('FTPProviderForm__input', 'warn', {
            valid: isSetupInput(state.username),
          })}
        >
          <input
            type="text"
            name="username"
            value={state.username || ''}
            onChange={handleChange}
          />
          <CheckIcon />
        </div>
      </label>

      <label>
        {t('Password')}
        <div
          className={classNames('FTPProviderForm__input', 'warn', {
            valid: isSetupInput(state.password),
          })}
        >
          <input
            type="password"
            name="password"
            value={state.password || ''}
            onChange={handleChange}
          />
          <CheckIcon />
        </div>
      </label>

      <div className="FTPProviderForm__checkbox">
        <input
          type="checkbox"
          name="secure"
          checked={state.secure}
          onChange={handleChange}
        />
        <label>
          {t('Secure')}
          <p className="small">{t('Explicit FTPS over TLS.')}</p>
        </label>
      </div>

      <div className="FTPProviderForm__actions">
        <button type="submit" disabled={!isValid}>
          {submitCaption}
        </button>
      </div>
    </form>
  )
}
