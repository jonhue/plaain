import { IItem, ItemKind } from './Item'

export enum Gender {
  Female,
  Male,
  Unknown,
}

export enum Job {
  Actor = 'Actor',
  Actress = 'Actress',
}

interface IPerson extends IItem {
  kind: typeof ItemKind.Person
  name: string
  gender: Gender
  profilePath: string | undefined
}

export interface AccPerson extends IPerson {
  jobs: Job[]
}

export interface Person extends IPerson {
  job: Job
}

export interface CastMember extends Person {
  character: string
}

export interface CrewMember extends Person {
  department: string
}
