import { IItem, ItemKind } from './Item'

export enum Gender {
  Female,
  Male,
  Unknown,
}

export enum Job {
  Actor = 'Actor',
  Actress = 'Actress',
  Casting = 'Casting',
  CostumeDesign = 'Costume Design',
  Director = 'Director',
  DirectorOfPhotography = 'Director of Photography',
  ExecutiveProducer = 'Executive Producer',
  Editor = 'Editor',
  OriginalMusicComposer = 'Original Music Composer',
  Producer = 'Producer',
  Screenplay = 'Screenplay',
  SoundDesigner = 'Sound Designer',
  UnitProductionManager = 'Unit Production Manager',
  Writer = 'Writer',
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
