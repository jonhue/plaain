import { UserAgentApplication } from 'msal'

class MicrosoftAuth {
  static config = {
    clientID: process.env.REACT_APP_MICROSOFT_CLIENT_ID,
    scopes: ['user.read', 'files.read.all'],
  }

  constructor() {
    this._userAgentApplication = new UserAgentApplication({
      auth: {
        clientId: MicrosoftAuth.config.clientID,
      },
    })
  }

  perform() {
    return this.silentLogIn()
  }

  silentLogIn() {
    return this.userAgentApplication
      .acquireTokenSilent({
        scopes: MicrosoftAuth.config.scopes,
      })
      .then((response) => {
        return response.accessToken
      })
      .catch((error) => {
        console.log(error)
        return this.popupLogIn()
      })
  }

  popupLogIn() {
    return this.userAgentApplication
      .loginPopup({
        scopes: MicrosoftAuth.config.scopes,
        prompt: 'select_account',
      })
      .then(() => {
        return this.userAgentApplication.acquireTokenSilent({
          scopes: MicrosoftAuth.config.scopes,
        })
      })
      .then((response) => {
        return response.accessToken
      })
  }

  get userAgentApplication() {
    return this._userAgentApplication
  }
}

export default MicrosoftAuth
