import View from "./view.js";

class homePageView extends View {
  _parentElement = document.querySelector(".home-page");
  _darkModeToggler = document.querySelector(".theme-switcher");

  constructor() {
    super();

    this._darkModeToggle();
  }

  _toogleMode() {
    const body = document.querySelector("body");

    const themeSwitcherSrOnlyText = document
      .querySelector(".theme-switcher__icon")
      .querySelector(".sr-only");

    const themeSwitcherMode = document.querySelector(".theme-switcher__mode");

    if (themeSwitcherSrOnlyText.textContent.includes("light mode")) {
      themeSwitcherSrOnlyText.textContent = "the page is in dark mode";

      body.classList.add("dark");

      this._darkModeToggler.setAttribute("aria-pressed", "true");
    } else {
      themeSwitcherSrOnlyText.textContent = "the page is in light mode";

      body.classList.remove("dark");

      this._darkModeToggler.setAttribute("aria-pressed", "false");
    }
  }

  _darkModeToggle() {
    this._darkModeToggler.addEventListener(
      "click",
      this._toogleMode.bind(this)
    );
    this._darkModeToggler.addEventListener(
      "keyup",
      function (e) {
        if (e.key === "Enter") {
          this._toogleMode();
        }
      }.bind(this)
    );
  }

  _addHandlerClickOnWhereInTheWorld(handler) {
    const title = document.querySelector(".title");

    title.addEventListener("click", function () {
      handler();
    });
  }
}

export default new homePageView();
