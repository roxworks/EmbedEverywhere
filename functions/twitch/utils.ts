import fetch from "node-fetch";
import { AccessToken } from 'simple-oauth2';
import oauth2, { config } from './config';
import * as cookie from 'cookie';
import { ApiClient } from 'twitch';
import { StaticAuthProvider } from 'twitch-auth';

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

async function twitchApiClient(oauthToken: AccessToken) {
	const authProvider = new StaticAuthProvider(config.oauth.client.id, oauthToken.token.access_token);
	const apiClient = new ApiClient({ authProvider });
	return apiClient;
}

async function getTwitchAccessTokenFromCookie(cookieHeader: string): Promise<AccessToken> {
	const parsedCookie = cookie.parse(cookieHeader);
	const accessTokenData = JSON.parse(parsedCookie.twitch_session);
	return oauth2.createToken(accessTokenData);
}

export {
	getTwitchAccessToken,
	getTwitchAccessTokenFromCookie,
	twitchApiClient
}
