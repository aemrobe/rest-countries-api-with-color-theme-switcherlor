import icons from "url:../../imgs/icons.svg";

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
        <svg aria-hidden="true">
          <use href="${icons}#icon-loader"></use>
        </svg>

        <span class="sr-only">Loading...</span>
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
          <use href="${icons}#icon-alert-triangle"></use>
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
