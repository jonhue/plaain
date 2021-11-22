import './VerticalSlide.scss'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import SwiperCore, { EffectCoverflow } from 'swiper'
import { buildCoverUrl, buildItemUrl } from '../util'
import { Cover } from './Cover'
import { Link } from 'react-router-dom'
import { Movie } from '../types/items/Movie'
import React from 'react'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'
import { useTranslation } from 'react-i18next'

SwiperCore.use([EffectCoverflow])

type VerticalSlideProps = {
  id: string
  items: (Movie | Season | Show)[]
  path: string
}

export const VerticalSlide = ({ id, items, path }: VerticalSlideProps) => {
  const { t } = useTranslation()

  return (
    <div className="VerticalSlide" id={id}>
      <Swiper
        direction="vertical"
        slidesPerView="auto"
        grabCursor
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 425,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        history={{
          replaceState: true,
          key: path,
        }}
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <SwiperSlide data-history={item.id} key={index}>
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
