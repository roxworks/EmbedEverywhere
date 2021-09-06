import { Handler } from "@netlify/functions";
import { config } from './twitch/config'
import * as cookie from 'cookie';

const handler: Handler = async (_event, _context) => {
  const cookieHeader = cookie.serialize(config.cookieName, "", {
    httpOnly: false,
    sameSite: "strict",
    secure: true,
    path: "/",
    expires: new Date(0)
  });

  return {
    statusCode: 303,
    body: "",
    headers: {
      'Set-Cookie': cookieHeader,
      'Location': "/"
    }
  };
};

export { handler };
