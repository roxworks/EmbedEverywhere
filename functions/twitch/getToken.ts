import fetch from 'node-fetch';
import { AccessToken } from 'simple-oauth2'
import oauth2, { config } from './config'

export default async function getTwithAccessToken(authorization_code: string): Promise<AccessToken>  {
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
