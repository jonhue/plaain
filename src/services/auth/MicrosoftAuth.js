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
    return new Promise((resolve, reject) => {
      this.logIn().then(accessToken => {
        resolve({
          token: accessToken,
          user: this.userAgentApplication.getUser()
        })
      }, error => reject(error))
    })
  }

  logIn() {
    return new Promise((resolve, reject) => {
      this.userAgentApplication.loginPopup(MicrosoftAuth.config.graphScopes).then(() => {
        this.userAgentApplication.acquireTokenSilent(MicrosoftAuth.config.graphScopes).then(accessToken => {
          resolve(accessToken)
        }, () => {
          this.userAgentApplication.acquireTokenPopup(MicrosoftAuth.config.graphScopes).then(accessToken => {
            resolve(accessToken)
          }, error => reject(error))
        })
      }, error => reject(error))
    })
  }

  get userAgentApplication() {
    return this._userAgentApplication
  }
}

export default MicrosoftAuth
