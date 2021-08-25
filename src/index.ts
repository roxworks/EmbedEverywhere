import './style.css'

window.addEventListener('load', () => {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('twitch_session='))) {
    console.log("User is logged in.")
    var link_box = <HTMLAnchorElement>document.getElementById("twitch-link");
    link_box.href = "/form.html";
    link_box.text = "Update your form";
  } else {
    console.log("")
  }
});
