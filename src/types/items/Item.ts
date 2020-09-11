export enum ItemKind {
  Episode,
  Movie,
  Person,
  Season,
  Show,
}

export interface Item {
  kind: ItemKind
  id: string
}
