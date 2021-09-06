import { AuthorizationCode } from 'simple-oauth2'

/* process.env.URL comes from netlify build environment */
const siteUrl = process.env.URL || 'http://localhost:8888'

export const config = {
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: `${siteUrl}/api/twitch-callback`,
  scope: 'user:read:email user:read:subscriptions',

  cookieName: 'twitch_session',

  oauth: {
    client: {
      id: process.env.TWITCH_CLIENT_ID || "",
      secret: process.env.TWITCH_CLIENT_SECRET || ""
    },
    auth: {
      tokenHost: 'https://id.twitch.tv',
      tokenPath: '/oauth2/token',
      authorizePath: '/oauth2/authorize',
      revokePath: '/oauth2/revoke'
    }
  }
}

function authInstance() {
  if (config.oauth.client.id === "") {
    throw new Error('Missing a required environment variable. Please set TWITCH_CLIENT_ID')
  }
  if (config.oauth.client.secret === "") {
    throw new Error('Missing a required environment variable. Please set TWITCH_CLIENT_SECRET')
  }
  // return oauth instance
  return new AuthorizationCode(config.oauth)
}

/* Create oauth2 instance to use in our two functions */
export default authInstance()
