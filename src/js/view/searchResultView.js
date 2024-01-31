import View from "./view.js";

class SearchResultView extends View {
  _parentElement = document.querySelector(".find-country__search");

  constructor() {
    super();

    this._addHandlerHidingTheSearchResult();
  }

  _getQuery() {
    this._parentElement = document.querySelector(".find-country__search");

    const query = this._parentElement.querySelector(
      ".find-country__search-input"
    ).value;

    return query;
  }

  _clear() {
    this._parentElement = document.querySelector(
      ".find-country__search-results"
    );

    this._parentElement.innerHTML = "";
  }

  _addHandlerSearchResult(handler) {
    this._parentElement = document.querySelector(".find-country__search");

    this._parentElement
      .querySelector(".find-country__search-input")
      .addEventListener(
        "keyup",
        function () {
          handler();

          this._parentElement.classList.remove("hide-result-list");
          this._parentElement.classList.remove("not-open");
          this._parentElement.classList.add("show-result-list");
        }.bind(this)
      );
  }

  _addHandlerHidingTheSearchResult() {
    document.addEventListener(
      "click",
      function (e) {
        const searchForm = e.target.closest(".find-country__search");

        if (searchForm) return;

        console.log("outside the search engine");

        this._parentElement.classList.remove("show-result-list");
        this._parentElement.classList.add("hide-result-list");

        setTimeout(() => {
          this._parentElement.classList.remove("hide-result-list");
          this._parentElement.classList.add("not-open");
        }, 2000);
      }.bind(this)
    );
  }

  _generateMarkup() {
    const data = [];

    this._parentElement = document.querySelector(
      ".find-country__search-results"
    );

    for (let i = 0; i < this._data.flags.length; i++) {
      data.push(
        ` <p class="find-country__search-result result-${i + 1}">${
          this._data.countries[i]
        }</p>`
      );
    }

    return data.join("");
  }
}

export default new SearchResultView();
