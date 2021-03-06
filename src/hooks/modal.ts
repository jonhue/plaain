import { useCallback, useState } from 'react'

export const useModal = (): [
  show: boolean,
  handleOpen: () => void,
  handleClose: () => void,
] => {
  const [show, setShow] = useState(false)
  const handleOpen = useCallback(() => setShow(true), [setShow])
  const handleClose = useCallback(() => setShow(false), [setShow])

  return [show, handleOpen, handleClose]
}
