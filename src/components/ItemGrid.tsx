import './ItemGrid.scss'
import { buildCoverUrl, buildItemUrl } from '../util'
import Cover from './Cover'
import { Link } from 'react-router-dom'
import { Movie } from '../types/items/Movie'
import React from 'react'
import { Season } from '../types/items/Season'
import { Show } from '../types/items/Show'
import { useTranslation } from 'react-i18next'

type ItemGridProps = {
  items: (Movie | Season | Show)[]
}

const ItemGrid = ({ items }: ItemGridProps) => {
  const { t } = useTranslation()

  return (
    <div className="ItemGrid">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="ItemGrid__item" key={item.id}>
            <Link to={buildItemUrl(item)}>
              <Cover url={buildCoverUrl(item.posterPath)} alt={item.title} />
            </Link>
          </div>
        ))
      ) : (
        <div className="ItemGrid__item">
          <h3>{t('Nothing found.')}</h3>
        </div>
      )}
    </div>
  )
}

export default ItemGrid
