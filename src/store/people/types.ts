export const ADD_PERSON = 'ADD_PERSON'
export const RESET_PEOPLE = 'RESET_PEOPLE'

export interface PeopleState {
  ids: string[]
}

interface AddPersonAction {
  type: typeof ADD_PERSON
  payload: {
    id: string
  }
}

interface ResetPeopleAction {
  type: typeof RESET_PEOPLE
}

export type PeopleActionTypes = AddPersonAction | ResetPeopleAction
