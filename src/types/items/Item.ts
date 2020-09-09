export enum ItemKind {
  Episode,
  Movie,
  Season,
  Show,
  Person,
}

export interface Item {
  kind: ItemKind
  id: string
}
