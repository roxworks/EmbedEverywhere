import { updateNavBar, guardLoggedIn } from './common';
import './style.css'
import { enter, leave } from 'el-transition'; 

guardLoggedIn();
updateNavBar();

export function alertFadeToggle(alertContainer: HTMLElement) {
  console.log("Fading alert", alertContainer)
  if(alertContainer.classList.contains('hidden')) {
    enter(alertContainer)
  } else {
    leave(alertContainer)
  }
}

window.addEventListener('load', () => {
  console.log("Firing onload")
  const alertsCookieValue = document.cookie.split(';').find(item => item.trim().startsWith(`alerts=`))?.split('=')[1];
  console.log("Alerts to show:", alertsCookieValue)
  if (alertsCookieValue) {
    alertsCookieValue.split(",").forEach(function (alertName) {
      console.log("Making", alertsCookieValue, "visible")
      const alertContainer = document.getElementById(alertName + "Alert");
      if (! alertContainer) { return; }

      alertFadeToggle(alertContainer);
      alertContainer.dataset["timeoutId"] = String(setTimeout(alertFadeToggle, 3000, alertContainer));
    });
  }

  Array.from(document.getElementsByClassName("closeButton")).forEach(function (button) {
    button.addEventListener("click", function (event) {
      console.log("User dismissed alert box", event)
      const alertParent = (<HTMLElement>event.target).closest(".alertBoxTop")
      const timeoutId = (<HTMLElement>alertParent)?.dataset["timeoutId"]
      if (timeoutId) {
        clearTimeout(parseInt(timeoutId))
      }
      leave(alertParent);
    })
  });
})
