import { Handler } from "@netlify/functions";
import oauth2, { config } from './twitch/config'

const handler: Handler = async (_event, _context) => {
  const authorizationURI = oauth2.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: config.scope
  })

  return {
    statusCode: 303,
    body: "", // gotta specify this, but 3xx must be empty
    headers: {
      "Location": authorizationURI,
      "Cache-Control": "no-cache" // Disable caching
    }
  };
};

export { handler };
