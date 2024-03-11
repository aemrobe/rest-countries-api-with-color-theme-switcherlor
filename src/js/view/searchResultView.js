import View from "./view.js";
import displayCountryView from "./displayCountryView.js";
import icons from "url:../../imgs/icons.svg";

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
        <svg aria-hidden="true">
          <use href="${icons}#icon-loader"></use>
        </svg>

        <span class="sr-only">Loading...</span>
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
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>

      <p role="alert"  tabindex="0" aria-hidden="true">${error}</p>
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

  _closeTheSearchResult = function () {
    const searchResults = document.querySelector(
      ".find-country__search-results"
    );

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
  };

  _addHandlerHidingTheSearchResult() {
    document.addEventListener(
      "click",
      function (e) {
        const searchForm = e.target.closest(".find-country__search");

        if (searchForm) return;

        this._closeTheSearchResult();
      }.bind(this)
    );
  }

  _addHandlerSearchFromTheResults(handler) {
    const searchFromTheResults = async function (e) {
      const searchResult = e.target.closest(".find-country__search-result");

      if (!searchResult) return;

      const searchQuery = searchResult.textContent.toLowerCase();

      await handler(searchQuery);

      this._closeTheSearchResult();
    }.bind(this);

    this._parentElement.addEventListener("click", searchFromTheResults);

    document.addEventListener(
      "keyup",
      async function (e) {
        if (
          e.key === "Enter" &&
          e.target.closest(".find-country__search-result")
        ) {
          await searchFromTheResults(e);
        } else if (e.key === "Tab") {
          const searchResultContainer = document.querySelector(
            ".find-country__search-results-container"
          );

          const lastSearchResult = searchResultContainer.lastElementChild;

          if (document.activeElement === lastSearchResult) {
            document.addEventListener(
              "focusin",
              function (event) {
                // Check if the next focused element is outside the search results container
                if (!searchResultContainer.contains(event.target)) {
                  // Close the search results
                  this._closeTheSearchResult();
                }
              }.bind(this),
              { once: true }
            );
          }
        }
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
        ` <p role="button" tabindex="0" class="find-country__search-result result-${
          i + 1
        }">${this._data.countries[i]}</p>`
      );
    }

    return data.join("");
  }
}

export default new SearchResultView();
