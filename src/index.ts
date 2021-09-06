import { isUserLoggedIn, updateNavBar } from './common';
import './style.css'

window.addEventListener('load', () => {
  if (isUserLoggedIn()) {
    console.log("User is logged in.")
    var link_box = <HTMLAnchorElement>document.getElementById("twitch-link");
    link_box.href = "/form.html";
    link_box.text = "Update your form";
  } else {
    console.log("")
  }
});

updateNavBar();
