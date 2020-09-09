export enum FileKind {
  Source,
  Caption,
}

export interface File {
  kind: FileKind
  id: string
  name: string
}
