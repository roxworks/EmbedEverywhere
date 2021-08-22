const data = require('./data');

const twitch_ava = require("./find_twitch_avatar").twitch_ava;

(async () => {
    var url = await twitch_ava(data.twitch_name)

    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta name='twitter:card' content='player'>
        <meta name='twitter:site' content='@${data.twitter_name}'>
        <meta name='twitter:player' content="https://player.twitch.tv/?channel=${data.twitch_name}&parent=twitter.com&parent=www.twitter.com&parent=dangiai.me&parent=www.dangiai.me&parent=dangiaime.github.io&parent=www.dangiaime.github.io&parent=cards-dev.twitter.com&parent=cards-frame.twitter.com&parent=tweetdeck.twitter.com&parent=mobile.twitter.com&autplay=true">
        <meta name='twitter:player:width' content='1280'>
        <meta name='twitter:player:height' content='720'>
        <meta name='twitter:player:stream' content='true'>
        <meta name='twitter:player:stream:type' content='live'>
        <meta name='twitter:description' content="${data.description}">
        <meta name='twitter:image' content='${url}'>
        <meta name='twitter:title' content='${data.title}'>
        <meta http-equiv="Refresh" content="0; url='https://twitch.tv/${data.twitch_name}'" />
    </head>
    </html>`;

    console.log(html);
})();
