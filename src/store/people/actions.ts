import { ADD_PERSON, PeopleActionTypes, RESET_PEOPLE } from './types'

export const addPerson = (id: string): PeopleActionTypes => ({
  type: ADD_PERSON,
  payload: { id },
})

export const resetPeople = (): PeopleActionTypes => ({
  type: RESET_PEOPLE,
})
