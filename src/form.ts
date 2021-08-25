import './style.css'

document.addEventListener('DOMContentLoaded', () => {
	if (! document.cookie.split(';').some((item) => item.trim().startsWith('twitch_session='))) {
		console.log("User is not logged in, bouncing them to index page.")
		window.location.replace("/");
	}
});
