import './PersonList.scss'
import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Person } from '../types/items/Person'
import { buildItemUrl } from '../util'
import { useTranslation } from 'react-i18next'

const WRAPPED_SIZE = 10

type PersonListProps<T extends Person> = {
  people: T[]

  details: (person: T) => string
}

const PersonList = <T extends Person>({
  people,
  details,
}: PersonListProps<T>) => {
  const { t } = useTranslation()

  const [isWrapped, setIsWrapped] = useState(true)
  const toggleIsWrapped = useCallback(() => setIsWrapped((state) => !state), [
    setIsWrapped,
  ])

  const displayedPeople = useMemo(
    () => people.slice(0, isWrapped ? WRAPPED_SIZE : people.length),
    [isWrapped, people],
  )

  return (
    <div className="PersonList">
      {people.length > 0 ? (
        displayedPeople.map((person, index) => {
          return (
            <p key={index}>
              <Link to={buildItemUrl(person)}>{person.name}</Link> ·{' '}
              <span>{details(person)}</span>
            </p>
          )
        })
      ) : (
        <p>{t('None')}</p>
      )}
      {people.length > WRAPPED_SIZE && (
        <span onClick={toggleIsWrapped}>
          {isWrapped ? t('Show more') : t('Show less')}
        </span>
      )}
    </div>
  )
}

export default PersonList
