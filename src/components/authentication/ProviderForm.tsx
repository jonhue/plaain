import './ProviderForm.scss'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CheckIcon from '../icons/Nucleo/c-check'
import { Provider } from '../../types/providers/Provider'
import classNames from 'classnames'
import styles from '../../_variables.scss'
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

const ProviderForm = ({
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
    [initalState, onSubmit, state],
  )

  const isSetupInput = useCallback(
    (value: string | undefined) => value !== undefined,
    [],
  )

  const isValidInput = useCallback(
    (value: string | undefined) => value !== undefined && value.startsWith('/'),
    [],
  )

  const isValid = useMemo(
    () =>
      (!isSetupInput(state.moviesPath) || isValidInput(state.moviesPath)) &&
      (!isSetupInput(state.showsPath) || isValidInput(state.showsPath)),
    [isSetupInput, isValidInput, state],
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
            'The path to where you keep your movies from your home directory.',
          )}
        </p>
        <div
          className={classNames('ProviderForm__input', {
            setup: isSetupInput(state.moviesPath),
            valid: isValidInput(state.moviesPath),
          })}
        >
          <input
            type="text"
            name="moviesPath"
            value={state.moviesPath || ''}
            placeholder="/Plaain/movies"
            onChange={handleChange}
          />
          <CheckIcon color={styles.white} />
        </div>
      </label>

      <label>
        {t('Shows path')}
        <p className="small">
          {t('The path to where you keep your shows from your home directory.')}
        </p>
        <div
          className={classNames('ProviderForm__input', {
            setup: isSetupInput(state.showsPath),
            valid: isValidInput(state.showsPath),
          })}
        >
          <input
            type="text"
            name="showsPath"
            value={state.showsPath || ''}
            placeholder="/Plaain/shows"
            onChange={handleChange}
          />
          <CheckIcon color={styles.white} />
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

export default ProviderForm
