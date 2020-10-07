import './VerticalSlide.scss'
import 'swiper/swiper-bundle.css'
import React, { useEffect } from 'react'
import { buildCoverUrl, buildItemUrl } from '../util'
import Cover from './Cover'
import { Link } from 'react-router-dom'
import { Movie } from '../types/items/Movie'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'
import Swiper from 'swiper'
import { useTranslation } from 'react-i18next'

type VerticalSlideProps = {
  id: string
  items: (Movie | Season | Show)[]
  path: string
}

const VerticalSlide = ({ id, items, path }: VerticalSlideProps) => {
  const { t } = useTranslation()

  useEffect(() => {
    new Swiper(`.VerticalSlide#${id} .swiper-container`, {
      direction: 'vertical',
      slidesPerView: 'auto',
      grabCursor: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 425,
        depth: 150,
        modifier: 1,
        slideShadows: false,
      },
      history: {
        replaceState: true,
        key: path,
      },
    })
  }, [id, path])

  return (
    <div className="VerticalSlide" id={id}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="swiper-slide" data-history={item.id} key={index}>
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

export default VerticalSlide
