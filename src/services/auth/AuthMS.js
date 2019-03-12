import * as Msal from 'msal'

class AuthMS {
  static config = {
    clientID: process.env.REACT_APP_MS_CLIENT_ID,
    graphScopes: ['user.read', 'files.read.all']
  }

  perform() {
    return new Msal.UserAgentApplication(
      AuthMS.config.clientID,
      'https://login.microsoftonline.com/common',
      null
    )
  }
}

export default AuthMS
