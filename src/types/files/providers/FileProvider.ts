import { ProviderKind } from '../../providers/Provider'

export interface FileProvider {
  kind: ProviderKind
  id: string
  name: string
  extension: string | undefined
}
