import View from "./view.js";

class homePageView extends View {
  _parentElement = document.querySelector(".home-page");

  constructor() {
    super();

    this._darkModeToggle();
  }

  _darkModeToggle() {
    const body = document.querySelector("body");

    const themeSwitcherSrOnlyText = document
      .querySelector(".theme-switcher__icon")
      .querySelector(".sr-only");

    const darkModeToggler = document.querySelector(".theme-switcher");

    darkModeToggler.addEventListener("click", function () {
      if (themeSwitcherSrOnlyText.textContent.includes("light mode")) {
        themeSwitcherSrOnlyText.textContent =
          "icon which shows the page is in dark mode";

        body.classList.add("dark");
      } else {
        themeSwitcherSrOnlyText.textContent =
          "icon which shows the page is in light mode";

        body.classList.remove("dark");
      }
    });
  }

  _addHandlerClickOnWhereInTheWorld(handler) {
    const title = document.querySelector(".title");

    title.addEventListener("click", function () {
      handler();
    });
  }
}

export default new homePageView();
