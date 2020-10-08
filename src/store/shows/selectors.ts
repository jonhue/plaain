import { ShowsState } from './types'

export const showSelector = (id: string) => (state: ShowsState) => state[id]

export const showsSelector = (state: ShowsState) =>
  Object.keys(state).map((id) => state[id]!)
