import './HorizontalSlide.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { buildCoverUrl, buildItemUrl } from '../util'
import { AccPerson } from '../types/items/Person'
import { Cover } from './Cover'
import { Link } from 'react-router-dom'
import { Movie } from '../types/items/Movie'
import React from 'react'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

type HorizontalSlideProps = {
  id: string
  items: (Movie | Season | Show | AccPerson)[]
  small?: boolean
}

export const HorizontalSlide = ({ id, items, small }: HorizontalSlideProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames('HorizontalSlide', { small })} id={id}>
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
                {small && <h6>{item.title}</h6>}
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
