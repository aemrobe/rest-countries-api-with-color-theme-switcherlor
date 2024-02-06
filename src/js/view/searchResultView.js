import View from "./view.js";
import displayCountryView from "./displayCountryView.js";

class SearchResultView extends View {
  _parentElement = document.querySelector(".find-country__search");

  constructor() {
    super();

    this._addHandlerHidingTheSearchResult();
  }

  _getQuery() {
    const searchInput = document.querySelector(".find-country__search-input");

    const query = searchInput.value;

    return query;
  }

  _clear() {
    const searchResultContainer = document.querySelector(
      ".find-country__search-results-container"
    );

    searchResultContainer.innerHTML = "";
  }

  _clearSearchInputValue() {
    const searchInput = document.querySelector(".find-country__search-input");

    searchInput.value = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="src/imgs/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clear();

    const searchResultContainer = document.querySelector(
      ".find-country__search-results-container"
    );

    searchResultContainer.insertAdjacentHTML("afterbegin", markup);
  }

  _renderErrorMessage(error) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="src/imgs/icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>

      <p>${error}</p>
    </div>`;

    this._clear();

    const searchResultContainer = document.querySelector(
      ".find-country__search-results-container"
    );

    searchResultContainer.insertAdjacentHTML("afterbegin", markup);
  }

  _render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._clear();

    const searchResultContainer = document.querySelector(
      ".find-country__search-results-container"
    );

    searchResultContainer.insertAdjacentHTML("beforeEnd", markup);
  }

  _addHandlerSearchResult(handler) {
    const searchInput = document.querySelector(".find-country__search-input");

    searchInput.addEventListener(
      "keyup",
      async function () {
        await handler();

        this._parentElement = document.querySelector(
          ".find-country__search-results"
        );

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

        const searchResults = document.querySelector(
          ".find-country__search-results"
        );

        if (searchForm) return;

        if (!searchResults.classList.contains("show-result-list")) return;

        this._parentElement = document.querySelector(
          ".find-country__search-results"
        );

        this._parentElement.classList.remove("show-result-list");
        this._parentElement.classList.add("hide-result-list");

        setTimeout(() => {
          this._parentElement.classList.remove("hide-result-list");
          this._parentElement.classList.add("not-open");
        }, 500);
      }.bind(this)
    );
  }

  _addHandlerSearchFromTheResults(handler) {
    this._parentElement.addEventListener(
      "click",
      async function (e) {
        const searchResult = e.target.closest(".find-country__search-result");

        if (!searchResult) return;

        const searchQuery = searchResult.textContent.toLowerCase();

        await handler(searchQuery);
      }.bind(this)
    );
  }

  _addHandlerSearchFromTheFormSubmitted(handler) {
    this._parentElement.addEventListener(
      "submit",
      async function (e) {
        e.preventDefault();

        await handler(this._getQuery());

        this._clearSearchInputValue();
      }.bind(this)
    );
  }

  _renderCountry(searchResultData) {
    displayCountryView._render(searchResultData);
  }

  _generateMarkup() {
    const data = [];

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
