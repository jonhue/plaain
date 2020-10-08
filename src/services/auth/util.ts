import { ProviderKind } from '../../types/providers/Provider'

export const buildAuthId = (kind: ProviderKind, id: string) => `${kind}@${id}`
