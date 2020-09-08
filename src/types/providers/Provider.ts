export enum ProviderType {
  OneDrive,
}

export interface Provider {
  type: ProviderType;
  id: number;
}
