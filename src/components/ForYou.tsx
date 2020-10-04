import './ForYou.scss'
import HorizontalSlide from './HorizontalSlide'
import { Movie } from '../types/items/Movie'
import React from 'react'
import { Season } from '../types/items/Season'
import { useTranslation } from 'react-i18next'

type ForYouProps = {
  inProgress: (Movie | Season)[]
  recentlyWatched: (Movie | Season)[]
}

const ForYou = ({ inProgress, recentlyWatched }: ForYouProps) => {
  const { t } = useTranslation()

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
}

export default ForYou
