import { Client } from '@microsoft/microsoft-graph-client'

class OneDrive {
  constructor(accessToken) {
    this._client = Client.init({
      authProvider: (done) => done(null, accessToken),
    })
  }

  movies() {
    return this.client.api('/me/drive/root:/Plaain/Movies:/children').get()
  }

  shows() {
    return this.client.api('/me/drive/root:/Plaain/Shows:/children').get()
  }

  children(itemId) {
    return this.client.api(`/me/drive/items/${itemId}/children`).get()
  }

  get client() {
    return this._client
  }
}

export default OneDrive
