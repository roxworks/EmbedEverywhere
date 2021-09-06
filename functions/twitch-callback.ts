import { Handler } from "@netlify/functions";
import { CookieData, getTwitchAccessToken } from './twitch/utils';
import { AccessToken } from 'simple-oauth2';
import * as cookie from 'cookie';
import { twitchApiClient } from './twitch/utils'
import { config } from "./twitch/config";

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

    const client = await twitchApiClient(accessToken);
    var profile = await client.helix.users.getMe(true);
    var broadcasterId: number = 32985385; // Roxkstar74 on twitch
    var subbedToRox: boolean = await client.helix.users.userFollowsBroadcaster(profile.id, broadcasterId) !== null;
    const cookieData: CookieData = {
      token: accessToken.token,
      username: profile.name,
      is_subbed: subbedToRox,
      profile_picture: profile.profilePictureUrl
    }

    const cookieHeader = cookie.serialize(config.cookieName, JSON.stringify(cookieData), {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
      path: "/"
    });

    console.log(`Twitch user ${cookieData.username} has logged in. (Subbed? ${cookieData.is_subbed})`)
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
