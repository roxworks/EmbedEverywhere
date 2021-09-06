import { Handler } from "@netlify/functions";
import { parse, ParsedQs } from "qs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as cookie from 'cookie';
import { CookieData } from "./twitch/utils";

async function uploadFile(cookieData: CookieData, contents: string): Promise<boolean>  {
  const s3Client = new S3Client({ region: "us-west-1" });

  const params = {
    Bucket: "embedeverywhere",
    Key: `u/${cookieData.username}.html`,
    Body: contents,
	ACL: "public-read"
  };

  // Create an object and upload it to the Amazon S3 bucket.
  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log(`Successfully uploaded s3://${params.Bucket}/${params.Key}`);
    return true;
  } catch (err) {
    console.log("Error", err);
    return false;
  }
}

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
  description: string;
  title: string;
}

function buildHTML(formData: HtmlCardDetails, cookieData: CookieData): string {
	return `<!DOCTYPE html>
    <html>
    <head>
        <meta name='twitter:card' content='player'>
        <meta name='twitter:site' content='@${escapeHtml(formData.twitter_username)}'>
        <meta name='twitter:player' content="https://player.twitch.tv/?channel=${escapeHtml(cookieData.username)}&parent=twitter.com&parent=www.twitter.com&parent=cards-dev.twitter.com&parent=cards-frame.twitter.com&parent=tweetdeck.twitter.com&parent=mobile.twitter.com&autoplay=true">
        <meta name='twitter:player:width' content='1280'>
        <meta name='twitter:player:height' content='720'>
        <meta name='twitter:player:stream' content='true'>
        <meta name='twitter:player:stream:type' content='live'>
        <meta name='twitter:description' content="${escapeHtml(formData.description)}">
        <meta name='twitter:image' content='${cookieData.profile_picture}'>
        <meta name='twitter:title' content='${escapeHtml(formData.title)}'>
        <meta http-equiv="Refresh" content="0; url='https://twitch.tv/${escapeHtml(cookieData.username)}'" />
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

	const cookieHeader = event.headers["cookie"];
	var cookieData: CookieData;
	if (cookieHeader) {
		const parsedCookie = cookie.parse(cookieHeader);
		cookieData = JSON.parse(parsedCookie.twitch_session);
	} else {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "missing your cookie",
			})
		};
	}

	const parsedBody: ParsedQs = parse(formData);
	// TODO: raise when any of these are null.
	const details: HtmlCardDetails = {
		twitter_username: <string>parsedBody.twitter_username,
		description: <string>parsedBody.description,
		title: <string>parsedBody.title
	}

	console.log(`Building Twitch stream card HTML for ${cookieData.username}`)
	const htmlContents: string = buildHTML(details, cookieData);
	const success: boolean = await uploadFile(cookieData, htmlContents);

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "going to submit your changes",
			success: success
		})
	};
}

export { handler };
