import { Item, ItemKind } from './Item'

enum Gender {
  Female,
  Male,
}

type Job = 'Actress' | 'Actor'

export interface Person extends Item {
  kind: typeof ItemKind.Person
  name: string
  gender: Gender
  profileUrl: string
  jobs: Job[]
}
