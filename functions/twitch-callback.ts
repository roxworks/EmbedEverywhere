import { Handler } from "@netlify/functions";
import getTwithAccessToken from './twitch/getToken'
import { AccessToken } from 'simple-oauth2'

const handler: Handler = async (event, _context) => {
  var oauth2Code: string;
  var accessToken: AccessToken;
  var rawToken: string;

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
    var accessToken: AccessToken = await getTwithAccessToken(oauth2Code);
    console.log(accessToken);
    rawToken = accessToken.token.access_token;
    console.log(rawToken);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "yup, it worked. i think?",
        token: rawToken,
      })
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
