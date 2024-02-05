import View from "./view.js";

class ShowCountryDetailView extends View {
  _parentElement = document.querySelector(".page-detail");

  constructor() {
    super();
  }

  _addHandlerBackToTheHomePage(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const backBtn = e.target.closest(".back-btn");

      if (!backBtn) return;

      handler();
    });
  }

  _addHanlderShowCountryDetail(handler) {
    const listOfCountries = document.querySelector(".list-of-countries");

    listOfCountries.addEventListener("click", function (e) {
      const clickedCountryItem = e.target.closest(".country");

      if (!clickedCountryItem) return;

      const countryName = clickedCountryItem
        .querySelector(".country__name")
        .textContent.trim();

      handler(countryName);
    });
  }

  _generateMarkup() {
    return `   <button class="back-btn">
          <span class="fa-solid fa-arrow-left"></span>
          Back
        </button>

        <div class="page-detail__info">
          <img
            class="page-detail__info-img"
            src="${this._data.flag.png}"
            alt="${
              this._data.flag.alt ? this._data.flag.alt : "flag of the country"
            }"
          />

          <div class="page-detail__info-text">
            <h2 class="page-detail__country-name">${this._data.countryName}</h2>

             <div class="page-detail__info-wrapper">
            <div class="page-detail__info-text-part-1">
              <div class="page-detail__text-item">
                <!--native-name-->
                <p class="page-detail__text-item-title">native name:</p>
                <p class="page-detail__text-item-content">${
                  this._data.nativeName
                }</p>
              </div>

              <div class="page-detail__text-item">
                <p class="page-detail__text-item-title">Populations:</p>
                <p class="page-detail__text-item-content">${
                  this._data.population
                }</p>
              </div>

              <div class="page-detail__text-item">
                <p class="page-detail__text-item-title">Regions:</p>
                <p class="page-detail__text-item-content">${
                  this._data.region
                }</p>
              </div>

              <div class="page-detail__text-item">
                <p class="page-detail__text-item-title">Sub Region:</p>
                <p class="page-detail__text-item-content">${
                  this._data.subRegion
                }</p>
              </div>

              <div class="page-detail__text-item">
                <p class="page-detail__text-item-title">Capital:</p>
                <p class="page-detail__text-item-content">${
                  this._data.capital
                }</p>
              </div>
            </div>

            <div class="page-detail__info-text-part-2">
              <div class="page-detail__text-item">
                <p class="page-detail__text-item-title">Top Level Domain:</p>
                <p class="page-detail__text-item-content">${
                  this._data.topLevelDomain
                }</p>
              </div>

              <div class="page-detail__text-item">
                <p class="page-detail__text-item-title">Currencies:</p>
                <p class="page-detail__text-item-content">${
                  this._data.currency
                }</p>
              </div>

              <div class="page-detail__text-item">
                <p class="page-detail__text-item-title">Languages:</p>
                <p class="page-detail__text-item-content">
               ${this._data.languages}
                </p>
              </div>
            </div>
       </div>

            <div class="page-detail__info-text-part-3">
              <p
                class="page-detail__text-item-title page-detail__text-item-title--size-2"
              >
                Border Countries:
              </p>

              <div class="page-detail__text-item-container">
              ${this._data.borderCountries
                .map(this._displayBorderCountries)
                .join("")}
            </div>
            </div>
          </div>
        </div>`;
  }

  _displayBorderCountries(borderCountry) {
    return `   <p class="page-detail__text-item-border">${borderCountry}</p>`;
  }

  _addHandlerShowBorderCountryDetail(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const borderCountry = e.target.closest(".page-detail__text-item-border");

      if (!borderCountry) return;

      const borderCountryName = borderCountry.textContent.trim();

      handler(borderCountryName);
    });
  }
}

export default new ShowCountryDetailView();
