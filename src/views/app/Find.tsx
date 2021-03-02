import React, { useMemo } from 'react'
import Find from '../../components/Find'
import { useLocation } from 'react-router-dom'

const QUERY_PARAMETER = 'q'

const FindView = () => {
  const location = useLocation()
  const query = useMemo(
    () => new URLSearchParams(location.search).get(QUERY_PARAMETER),
    [location],
  )

  return <Find query={query} />
}

export default FindView
