import View from "./view.js";

class DisplayCountryView extends View {
  _parentElement = document.querySelector(".list-of-countries");

  _generateMarkup() {
    const data = [];

    for (let i = 0; i < this._data.flags.length; i++) {
      data.push(`<div class="country">
        <div class="image-container">
          <img src="${this._data.flags[i].png}" alt="${
        this._data.flags[i].alt === ""
          ? "image of the flag"
          : this._data.flags[i].alt
      }" class="country__flag" />
      </div>

          <div class="country__container">
            <h2 class="country__name">${this._data.countries[i]}</h2>

            <div class="country__static-container">
              <div class="country__statics">
                <p class="country__statics-title">Population:</p>
                <p class="country__statics-item">${
                  this._data.populations[i]
                }</p>
              </div>

              <div class="country__statics">
                <p class="country__statics-title">Region:</p>
                <p class="country__statics-item">${this._data.regions[i]}</p>
              </div>

              <div class="country__statics">
                <p class="country__statics-title">Capital:</p>
                <p class="country__statics-item">${this._data.capitals[i]}</p>
              </div>
            </div>
          </div>
        </div>`);
    }

    return data.join("");
  }
}

export default new DisplayCountryView();
