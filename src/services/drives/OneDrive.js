import { Client } from '@microsoft/microsoft-graph-client'

class OneDrive {
  constructor(accessToken) {
    this._client = Client.init({
      authProvider: done => done(null, accessToken)
    })
  }

  movies() {
    return new Promise((resolve, reject) => {
      this.client.api('/me/drive/root:/Plaain/Movies:/children').get()
                 .then(response => resolve(response), error => reject(error))
    })
  }

  shows() {
    return new Promise((resolve, reject) => {
      this.client.api('/me/drive/root:/Plaain/Shows:/children').get()
                 .then(response => resolve(response), error => reject(error))
    })
  }

  children(itemId) {
    return new Promise((resolve, reject) => {
      this.client.api(`/me/drive/items/${itemId}/children`).get()
                 .then(response => resolve(response), error => reject(error))
    })
  }

  get client() {
    return this._client
  }
}

export default OneDrive
