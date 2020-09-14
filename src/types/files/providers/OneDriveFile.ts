import { ProviderKind } from '../../providers/Provider'
import { FileProvider } from './FileProvider'

export interface OneDriveFile extends FileProvider {
  kind: typeof ProviderKind.OneDrive
  itemId: string
}
