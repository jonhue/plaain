import './HorizontalSlide.scss'
import 'swiper/swiper.scss'
import React, { useEffect } from 'react'
import { buildCoverUrl, buildItemUrl } from '../util'
import { Cover } from './Cover'
import { Link } from 'react-router-dom'
import { Movie } from '../types/items/Movie'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'
import Swiper from 'swiper'
import { useTranslation } from 'react-i18next'

type HorizontalSlideProps = {
  id: string
  items: (Movie | Season | Show)[]
}

export const HorizontalSlide = ({ id, items }: HorizontalSlideProps) => {
  const { t } = useTranslation()

  useEffect(() => {
    new Swiper(`.HorizontalSlide#${id} .swiper-container`, {
      spaceBetween: 15,
      slidesPerView: 'auto',
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20,
      grabCursor: true,
    })
  }, [id])

  return (
    <div className="HorizontalSlide" id={id}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="swiper-slide" key={index}>
                <Link to={buildItemUrl(item)}>
                  <Cover
                    url={buildCoverUrl(item.posterPath)}
                    alt={item.title}
                  />
                </Link>
              </div>
            ))
          ) : (
            <div className="swiper-slide">
              <h3>{t('Nothing found.')}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
