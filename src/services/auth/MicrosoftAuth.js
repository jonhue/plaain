import { UserAgentApplication } from 'msal'

class MicrosoftAuth {
  static config = {
    clientID: process.env.REACT_APP_MICROSOFT_CLIENT_ID,
    graphScopes: ['user.read', 'files.read.all']
  }

  constructor() {
    this._userAgentApplication = new UserAgentApplication({ auth: { clientId: MicrosoftAuth.config.clientID } })
  }

  perform() {
    return this.silentLogIn().then(accessToken => {
      return {
        token: accessToken
      }
    })
  }

  silentLogIn() {
    return this.userAgentApplication.acquireTokenSilent({ scopes: MicrosoftAuth.config.graphScopes }).then(response => {
      return response.accessToken
    }).catch(error => {
      console.log(error)
      return this.popupLogIn()
    })
  }

  popupLogIn() {
    return this.userAgentApplication.loginPopup({ scopes: MicrosoftAuth.config.graphScopes, prompt: 'select_account' }).then(() => {
      return this.userAgentApplication.acquireTokenSilent({ scopes: MicrosoftAuth.config.graphScopes })
    }).then(response => {
      return response.accessToken
    }).catch(error => {
      console.log(error)
    })
  }

  get userAgentApplication() {
    return this._userAgentApplication
  }
}

export default MicrosoftAuth
