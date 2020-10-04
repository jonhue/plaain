import './ForYou.scss'
import { ConnectedProps, connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import React, { useCallback } from 'react'
import {
  inProgressSelector,
  recentlyWatchedSelector,
} from '../../store/selectors'
import HorizontalSlide from '../../components/HorizontalSlide'
import { RootState } from '../../store'
import { index } from '../../store/thunks'
import { moviesSelector } from '../../store/movies/selectors'
import { providersSelector } from '../../store/auth/selectors'
import { showsSelector } from '../../store/shows/selectors'
import { sortByLastWatched } from '../../util'
import { useTranslation } from 'react-i18next'

const mapState = (state: RootState) => ({
  inProgress: sortByLastWatched(inProgressSelector(state)),
  movies: moviesSelector(state.movies),
  providers: providersSelector(state.auth),
  recentlyWatched: sortByLastWatched(recentlyWatchedSelector(state)),
  shows: showsSelector(state.shows),
})
const mapDispatch = { index }

const connector = connect(mapState, mapDispatch)

type ForYouProps = ConnectedProps<typeof connector> & RouteComponentProps

const ForYou = ({
  index,
  inProgress,
  movies,
  providers,
  recentlyWatched,
  shows,
}: ForYouProps) => {
  const { t } = useTranslation()

  const handleIndex = useCallback(() => {
    index(providers)
  }, [index, providers])

  if (inProgress.length > 0 || recentlyWatched.length > 0) {
    return (
      <div className="ForYou">
        {inProgress.length > 0 && (
          <section>
            <h2>{t('Continue watching')}</h2>
            <HorizontalSlide items={inProgress} id="inProgress" />
          </section>
        )}

        {recentlyWatched.length > 0 && (
          <section>
            <h2>{t('Recently watched')}</h2>
            <HorizontalSlide items={recentlyWatched} id="recentlyWatched" />
          </section>
        )}
      </div>
    )
  } else if (providers.length === 0) {
    return (
      <div className="ForYou">
        <h2>{t('Get started')}</h2>
        <p>
          {t(
            'To watch your movies and TV shows, you first have to sign in with the cloud service that hosts your media.',
          )}
        </p>
        <Link to="/app/settings" className="button">
          {t('Authenticate')}
        </Link>
        <p className="small">
          {t(
            'Note that Plaain may {{not}} be used to stream pirated content or publicly share your private media library. You may only connect to your private cloud storage.',
            { not: <span className="bold">{t('not')}</span> },
          )}
        </p>
      </div>
    )
  } else if (movies.length === 0 && shows.length === 0) {
    return (
      <div className="ForYou">
        <h2>{t('Get started')}</h2>
        <p>
          {t(
            "You signed into a cloud service, but we didn't find any movies or TV shows.",
          )}
        </p>
        <p>
          {t(
            "It's likely that you just have to move some of your files around and create some folders to make it work.",
          )}
        </p>
        <p>
          {t(
            "Reference the getting started guide to learn how to organize your files so that Plaain finds them. After you're done, just re-index.",
          )}
        </p>
        <div className="ForYou__buttons">
          <a
            className="button primary"
            href="https://github.com/jonhue/plaain#getting-started"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Getting started')}
          </a>
          <button onClick={handleIndex}>{t('Index')}</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ForYou">
        <h2>{t('Get started')}</h2>
        <p>
          {t(
            "Here, you'll be able to find your recently watched movie or the show you didn't finish yet.",
          )}
        </p>
        <div className="ForYou__buttons">
          {movies.length > 0 && (
            <Link to="/app/movies" className="button">
              {t('Discover your movies')}
            </Link>
          )}
          {shows.length > 0 && (
            <Link to="/app/shows" className="button">
              {t('Discover your shows')}
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default connector(ForYou)
