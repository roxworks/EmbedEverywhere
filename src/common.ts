import { CookieData } from "../functions/twitch/utils";

const config = {
    cookieName: "twitch_session"
}

function isUserLoggedIn(): boolean {
    return document.cookie.split(';').some((item) => item.trim().startsWith(`${config.cookieName}=`))
}

function getCookieData(): CookieData {
    var cookieValue = document.cookie.split(';').find(item => item.trim().startsWith(`${config.cookieName}=`));
    if (cookieValue) { // cookie was found
        var twitchSession = JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
    }

    return twitchSession;
}

function updateNavBar() {
    window.addEventListener('load', () => {
        const helloTag = <HTMLSpanElement>document.getElementById("helloTag");
        const loginButton = <HTMLButtonElement>document.getElementById("loginButton");
        if (isUserLoggedIn()) {
            helloTag.innerText = `Hello ${getCookieData().username}`;
            loginButton.innerText = 'Log out';
        } else {
            helloTag.innerText = `Hello!`;
            loginButton.innerText = 'Log in';
        }

        loginButton.addEventListener("click", function() {
            if (isUserLoggedIn()) {
                location.href = "/api/twitch-logout";
            } else {
                location.href = "/api/twitch-login";
            }
        });
    });
}

function guardLoggedIn() {
    document.addEventListener('DOMContentLoaded', () => {
	if (! isUserLoggedIn()) {
		console.log("User is not logged in, bouncing them to index page.")
		window.location.replace("/");
	}
    });
}

export {
    isUserLoggedIn,
    updateNavBar,
    getCookieData,
    guardLoggedIn
}
