import { UserAgentApplication } from 'msal'

class MicrosoftAuth {
  static config = {
    clientID: process.env.REACT_APP_MICROSOFT_CLIENT_ID,
    graphScopes: ['user.read', 'files.read.all']
  }

  constructor() {
    this._userAgentApplication = new UserAgentApplication(
      MicrosoftAuth.config.clientID,
      'https://login.microsoftonline.com/common',
      null
    )
  }

  perform() {
    return this.logIn().then(accessToken => {
      return {
        token: accessToken,
        user: this.userAgentApplication.getUser()
      }
    })
  }

  logIn() {
    return this.userAgentApplication.loginPopup(MicrosoftAuth.config.graphScopes).then(() => {
      return this.userAgentApplication.acquireTokenSilent(MicrosoftAuth.config.graphScopes).then(accessToken => {
        return accessToken
      }).catch(() => {
        return this.userAgentApplication.acquireTokenPopup(MicrosoftAuth.config.graphScopes).then(accessToken => {
          return accessToken
        })
      })
    })
  }

  get userAgentApplication() {
    return this._userAgentApplication
  }
}

export default MicrosoftAuth
