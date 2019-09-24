export const LOADING_BEGIN = 'LOADING_BEGIN'
export const LOADING_STOP = 'LOADING_STOP'

export const loadingBegin = caption => ({
  type: LOADING_BEGIN,
  payload: caption
})

export const loadingStop = () => ({
  type: LOADING_STOP
})
