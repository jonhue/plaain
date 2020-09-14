export enum ProviderKind {
  OneDrive,
}

export interface Provider {
  kind: ProviderKind
  id: string
  name: string
  path: string
}
