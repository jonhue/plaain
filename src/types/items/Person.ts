import { IItem, ItemKind } from './Item'

export enum Gender {
  Female,
  Male,
  Unknown,
}

export enum Job {
  Acting = 'Acting',
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
  title: string
  gender: Gender
  posterPath: string | undefined
}

export interface AccPerson extends IPerson {
  characters: string[]
  jobs: Job[] | undefined
}

export interface Person extends IPerson {
  job: Job | undefined
}

export interface CastMember extends Person {
  character: string
}

export interface CrewMember extends Person {
  department: string
}
