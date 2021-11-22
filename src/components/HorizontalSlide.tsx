import './HorizontalSlide.scss'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import { buildCoverUrl, buildItemUrl } from '../util'
import { Cover } from './Cover'
import { Link } from 'react-router-dom'
import { Movie } from '../types/items/Movie'
import React from 'react'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'
import { useTranslation } from 'react-i18next'

type HorizontalSlideProps = {
  id: string
  items: (Movie | Season | Show)[]
}

export const HorizontalSlide = ({ id, items }: HorizontalSlideProps) => {
  const { t } = useTranslation()

  return (
    <div className="HorizontalSlide" id={id}>
      <Swiper
        spaceBetween={15}
        slidesPerView="auto"
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        grabCursor
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={buildItemUrl(item)}>
                <Cover url={buildCoverUrl(item.posterPath)} alt={item.title} />
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <h3>{t('Nothing found.')}</h3>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
