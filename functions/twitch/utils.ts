import fetch from 'node-fetch';
import { AccessToken } from 'simple-oauth2'
import oauth2, { config } from './config'
import * as cheerio from 'cheerio';

async function getTwitchAccessToken(authorization_code: string): Promise<AccessToken>  {
	const url = `${config.oauth.auth.tokenHost}${config.oauth.auth.tokenPath}` + 
		`?client_id=${config.oauth.client.id}` +
		`&client_secret=${config.oauth.client.secret}` +
		`&code=${authorization_code}` + 
		`&grant_type=authorization_code` + 
		`&redirect_uri=${config.redirect_uri}`;

	const response = await fetch(url, {method: 'POST'});
	const data = await response.json();
	return oauth2.createToken(data);
}

async function getTwitchProfileUrl(username: string): Promise<string | undefined>  {
  const response = await fetch(`https://twitch.tv/${username}`);
  const body = await response.text();
  const $ = cheerio.load(body);

  var twitch_profile_url = $('meta[property="og:image"]').attr("content");

  return twitch_profile_url;
}

export {
	getTwitchAccessToken,
	getTwitchProfileUrl
}
