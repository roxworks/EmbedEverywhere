const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function twitch_ava(name) {
  const response = await fetch(`https://twitch.tv/${name}`);
  const body = await response.text();
  const $ = cheerio.load(body);

  var twitch_profile_url = $('meta[property="og:image"]').attr("content");

  return twitch_profile_url;
}

exports.twitch_ava = twitch_ava

/*
(async () => {
  const data = require('./data');

  console.log(`https://twitch.tv/${data.twitch_name}`);

  url = twitch_ava(data.twitch_name)

  console.log(url);
})(); */
