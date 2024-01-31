export default class View {
  _parentElement;
  _data;

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
