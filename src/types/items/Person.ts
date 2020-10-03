import { IItem, ItemKind } from './Item'

enum Gender {
  Female,
  Male,
}

type Job = 'Actress' | 'Actor'

export interface Person extends IItem {
  kind: typeof ItemKind.Person
  name: string
  gender: Gender
  profileUrl: string
  jobs: Job[]
}
