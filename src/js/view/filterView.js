class FilterView {
  _parentElement = document.querySelector(".find-country__filter-countries");

  constructor() {
    this._addHandlerShowDropDown();
    this._addHandlerCloseDropDown();
  }

  _addHandlerCloseDropDown() {
    document.addEventListener(
      "click",
      function (e) {
        const insideFilterCountries = e.target.closest(
          ".find-country__filter-countries"
        );

        const expandIcon = document.querySelector(
          ".find-country__filter-icons"
        );

        const expandIconSronlyText = expandIcon.querySelector(".sr-only");

        //if the user clicks outside of the filter countries close the drop down
        if (!insideFilterCountries) {
          if (expandIconSronlyText.innerText.includes("expand")) {
            const targetIconElement =
              expandIconSronlyText.previousElementSibling;

            targetIconElement.classList.remove("fa-chevron-up");
            targetIconElement.classList.add("fa-chevron-down");
            this._parentElement.classList.remove("expand-drop-down");
            this._parentElement.classList.add("collapse");
            expandIconSronlyText.innerText = "arrow collapse";

            setTimeout(() => {
              this._parentElement.classList.remove("collapse");
              this._parentElement.classList.add("not-open");
            }, 500);
          }
        }
      }.bind(this)
    );
  }

  _addHandlerShowDropDown() {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        const expandIcon = e.target.closest(".find-country__filter-icons");

        /*return from the function when the user clicks outside of the collapse icon*/
        if (!expandIcon) return;

        const targetElement = this._parentElement.querySelector(".sr-only");
        const collapseIcon = targetElement.previousElementSibling;

        if (targetElement.innerText.includes("collapse")) {
          collapseIcon.classList.remove("fa-chevron-down");
          collapseIcon.classList.add("fa-chevron-up");
          this._parentElement.classList.remove("collapse");
          this._parentElement.classList.remove("not-open");
          this._parentElement.classList.add("expand-drop-down");
          targetElement.innerText = "arrow expand";
        } else if (targetElement.innerText.includes("expand")) {
          collapseIcon.classList.remove("fa-chevron-up");
          collapseIcon.classList.add("fa-chevron-down");
          this._parentElement.classList.remove("expand-drop-down");
          this._parentElement.classList.add("collapse");
          targetElement.innerText = "arrow collapse";

          setTimeout(() => {
            this._parentElement.classList.remove("collapse");
            this._parentElement.classList.add("not-open");
          }, 500);
        }
      }.bind(this)
    );
  }

  _addHandlerFilterByRegion(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const filterRegion = e.target.closest(
        ".find-country__filter-region-item"
      );

      if (!filterRegion) return;

      const filterRegionItem = filterRegion.textContent.trim().toLowerCase();

      handler(filterRegionItem);
    });
  }
}

export default new FilterView();
