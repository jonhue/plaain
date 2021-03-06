import './ProviderForm.scss'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CheckIcon } from '../icons/Nucleo/CheckIcon'
import { Provider } from '../../types/providers/Provider'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

type ProviderFormProps = {
  submitCaption: string
  provider?: Provider

  onSubmit: (
    moviesPath: string | undefined,
    showsPath: string | undefined,
  ) => void
}

type ProviderFormState = {
  moviesPath?: string
  showsPath?: string
}

export const ProviderForm = ({
  submitCaption,
  provider,
  onSubmit,
}: ProviderFormProps) => {
  const { t } = useTranslation()

  const initalState = useMemo<ProviderFormState>(
    () => ({
      moviesPath: provider?.moviesPath,
      showsPath: provider?.showsPath,
    }),
    [provider],
  )
  const [state, setState] = useState<ProviderFormState>(initalState)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const target = event.currentTarget
      setState((state) => ({
        ...state,
        [target.name]: target.value === '' ? undefined : target.value,
      }))
    },
    [setState],
  )

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      onSubmit(state.moviesPath, state.showsPath)
    },
    [onSubmit, state],
  )

  const isSetupInput = useCallback(
    (value: string | undefined) => value !== undefined && value !== '',
    [],
  )

  const isValidPath = useCallback(
    (value: string | undefined) => value !== undefined && value.startsWith('/'),
    [],
  )

  const isValid = useMemo(
    () =>
      (!isSetupInput(state.moviesPath) || isValidPath(state.moviesPath)) &&
      (!isSetupInput(state.showsPath) || isValidPath(state.showsPath)),
    [isSetupInput, isValidPath, state],
  )

  useEffect(() => {
    setState(initalState)
  }, [initalState, setState])

  return (
    <form className="ProviderForm" onSubmit={handleSubmit}>
      <label>
        {t('Movies path')}
        <p className="small">
          {t(
            'The path from your home directory to where you keep your movies.',
          )}
        </p>
        <div
          className={classNames('ProviderForm__input', {
            warn: isSetupInput(state.moviesPath),
            valid: isValidPath(state.moviesPath),
          })}
        >
          <input
            type="text"
            name="moviesPath"
            value={state.moviesPath || ''}
            placeholder="/Plaain/movies"
            onChange={handleChange}
          />
          <CheckIcon />
        </div>
      </label>

      <label>
        {t('Shows path')}
        <p className="small">
          {t('The path from your home directory to where you keep your shows.')}
        </p>
        <div
          className={classNames('ProviderForm__input', {
            warn: isSetupInput(state.showsPath),
            valid: isValidPath(state.showsPath),
          })}
        >
          <input
            type="text"
            name="showsPath"
            value={state.showsPath || ''}
            placeholder="/Plaain/shows"
            onChange={handleChange}
          />
          <CheckIcon />
        </div>
      </label>

      <div className="ProviderForm__actions">
        <button type="submit" disabled={!isValid}>
          {submitCaption}
        </button>
      </div>
    </form>
  )
}
