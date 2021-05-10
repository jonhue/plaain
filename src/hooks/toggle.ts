import { useCallback, useState } from 'react'

export const useToggle = (
  initialValue: boolean,
): [value: boolean, handleToggle: () => void] => {
  const [value, setValue] = useState(initialValue)
  const handleToggle = useCallback(
    () => setValue((state) => !state),
    [setValue],
  )

  return [value, handleToggle]
}
