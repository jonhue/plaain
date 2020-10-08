import { DriveItemChildrenResponse, DriveItemResponse } from './types'
import { Client } from '@microsoft/microsoft-graph-client'

export const getClient = (accessToken: string) =>
  Client.init({
    authProvider: (done) => done(null, accessToken),
  })

export const fetchPathChildren = (
  client: Client,
  path: string,
): Promise<DriveItemChildrenResponse> =>
  client.api(`/me/drive/root:${path}:/children`).get()

export const fetchItem = (
  client: Client,
  itemId: string,
): Promise<DriveItemResponse> => client.api(`/me/drive/items/${itemId}`).get()

export const fetchItemChildren = (
  client: Client,
  itemId: string,
): Promise<DriveItemChildrenResponse> =>
  client.api(`/me/drive/items/${itemId}/children`).get()
