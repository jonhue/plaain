import './SetupProvider.scss'
import React, { useCallback, useMemo, useState } from 'react'
import CheckIcon from '../icons/Nucleo/c-check'
import classNames from 'classnames'
import styles from '../../_variables.scss'
import { useTranslation } from 'react-i18next'

type SetupProviderProps = {
  onSetup: (
    moviesPath: string | undefined,
    showsPath: string | undefined,
  ) => void
}

type SetupProviderState = {
  moviesPath?: string
  showsPath?: string
}

const SetupProvider = ({ onSetup }: SetupProviderProps) => {
  const { t } = useTranslation()

  const initalState = useMemo<SetupProviderState>(() => ({}), [])
  const [state, setState] = useState<SetupProviderState>(initalState)

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
      setState(initalState)
      onSetup(state.moviesPath, state.showsPath)
    },
    [initalState, onSetup, state],
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

  return (
    <div className="SetupProvider">
      <h2>{t('Setup your provider')}</h2>
      <p>
        {t(
          "All that's left is to tell Plaain where to look for your movies and shows. You can always skip this step and come back later.",
        )}
      </p>
      <form className="SetupProvider__form" onSubmit={handleSubmit}>
        <label>
          {t('Movies path')}
          <p className="small">
            {t(
              'The path to where you keep your movies from your home directory.',
            )}
          </p>
          <div
            className={classNames('SetupProvider__form__input', {
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
            {t(
              'The path to where you keep your shows from your home directory.',
            )}
          </p>
          <div
            className={classNames('SetupProvider__form__input', {
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

        <div className="SetupProvider__form__actions">
          <button type="submit" disabled={!isValid}>
            {t('Complete')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SetupProvider
