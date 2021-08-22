const fetch = require('node-fetch');
const cheerio = require('cheerio');

const data = require('./data');

console.log(`https://twitch.tv/${data.twitch_name}`);

(async () => {
  const response = await fetch(`https://twitch.tv/${data.twitch_name}`);
  const body = await response.text();
  const $ = cheerio.load(body);

  console.log($('meta[property="og:image"]').attr("content"));
})();
