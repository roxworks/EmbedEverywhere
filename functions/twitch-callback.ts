import { Handler } from "@netlify/functions";
import { getTwitchAccessToken } from './twitch/utils';
import { AccessToken } from 'simple-oauth2';
import * as cookie from 'cookie';

const handler: Handler = async (event, _context) => {
  var oauth2Code: string;
  var accessToken: AccessToken;

  if (event?.queryStringParameters?.code == null) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        "error": "no oauth access code, what happened?!"
      })
    };
  } else {
    oauth2Code = event.queryStringParameters.code
  }

  try {
    var accessToken: AccessToken = await getTwitchAccessToken(oauth2Code);

    const cookieHeader = cookie.serialize('twitch_session', JSON.stringify(accessToken.token), {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
      path: "/"
    });

    return {
      statusCode: 303,
      body: "",
      headers: {
        'Set-Cookie': cookieHeader,
        'Location': "/form.html"
      }
    };
  } catch (error) {
    console.log('Access Token Error', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Access Token Error"
      })
    };
  }

};

export { handler };
