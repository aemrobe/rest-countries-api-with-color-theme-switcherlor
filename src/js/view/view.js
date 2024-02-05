export default class View {
  _parentElement;
  _data;

  _toggle() {
    this._parentElement.classList.toggle("hidden");
  }

  _show() {
    this._parentElement.classList.remove("hidden");
  }

  _hide() {
    this._parentElement.classList.add("hidden");
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

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
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

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML("beforeEnd", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
