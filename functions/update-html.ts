import { Handler } from "@netlify/functions";
import { parse, ParsedQs } from "qs";

// Copied this from https://gist.github.com/thetallweeks/7c452e211f286e77b6f2
const entityMap = new Map<string, string>(Object.entries({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
}))
export function escapeHtml(source: string) {
    return String(source).replace(/[&<>"'\/]/g, (s: string) => entityMap.get(s)!);
}

interface HtmlCardDetails {
  twitter_username: string;
  twitch_username: string;
  description: string;
  title: string;
}

function buildHTML(formData: HtmlCardDetails, url: string): string {
	return `<!DOCTYPE html>
    <html>
    <head>
        <meta name='twitter:card' content='player'>
        <meta name='twitter:site' content='@${escapeHtml(formData.twitter_username)}'>
        <meta name='twitter:player' content="https://player.twitch.tv/?channel=${escapeHtml(formData.twitch_username)}&parent=twitter.com&parent=www.twitter.com&parent=cards-dev.twitter.com&parent=cards-frame.twitter.com&parent=tweetdeck.twitter.com&parent=mobile.twitter.com&autoplay=true">
        <meta name='twitter:player:width' content='1280'>
        <meta name='twitter:player:height' content='720'>
        <meta name='twitter:player:stream' content='true'>
        <meta name='twitter:player:stream:type' content='live'>
        <meta name='twitter:description' content="${escapeHtml(formData.description)}">
        <meta name='twitter:image' content='${url}'>
        <meta name='twitter:title' content='${escapeHtml(formData.title)}'>
        <meta http-equiv="Refresh" content="0; url='https://twitch.tv/${escapeHtml(formData.twitch_username)}'" />
    </head>
    </html>`;
}

const handler: Handler = async (event, _context) => {
	if (event.headers['content-type'] !== "application/x-www-form-urlencoded") {
		return {
			statusCode: 400,
			body: JSON.stringify({error: "Not a form POST. What are you doing?"})
		}
	}

	if (event.httpMethod !== "POST") {
		return {
			statusCode: 400,
			body: JSON.stringify({error: "Not an HTTP POST. What are you doing?"})
		}
	}

	const formData = event.body || "";

	if (formData === "POST") {
		return {
			statusCode: 400,
			body: JSON.stringify({error: "No HTTP body sent in your post. What are you doing?"})
		}
	}

	const parsedBody: ParsedQs = parse(formData);
	// TODO: raise when any of these are null.
	const details: HtmlCardDetails = {
		twitch_username: <string>parsedBody.twitch_username,
		twitter_username: <string>parsedBody.twitter_username,
		description: <string>parsedBody.description,
		title: <string>parsedBody.title
	}
	console.log(buildHTML(details, "http://foo.invalid"));

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "going to submit your changes",
		})
	};
}

export { handler };
