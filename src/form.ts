import './style.css'

document.addEventListener('DOMContentLoaded', () => {
	const cookieName: string = 'twitch_session'
	if (! document.cookie.split(';').some((item) => item.trim().startsWith(`${cookieName}=`))) {
		console.log("User is not logged in, bouncing them to index page.")
		window.location.replace("/");
	}

	var cookieValue = document.cookie.split(';').find(item => item.trim().startsWith(`${cookieName}=`));
	if (cookieValue) { // cookie was found
		var twitchSession = JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
		console.log(twitchSession);
	}
});
