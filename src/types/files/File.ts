export enum FileType {
  Source,
  Caption,
}

export interface File {
  type: FileType;
  id: number;
}
