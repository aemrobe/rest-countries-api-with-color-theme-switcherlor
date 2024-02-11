class FilterView {
  _parentElement = document.querySelector(".find-country__filter-countries");

  constructor() {
    this._addHandlerHandleDropDown();
    this._addHandlerCloseDropDown();
  }

  _addHandlerCloseDropDown() {
    document.addEventListener(
      "click",
      function (e) {
        const insideFilterCountries = e.target.closest(
          ".find-country__filter-countries"
        );

        const clickDarkMode = e.target.closest(".theme-switcher");

        const clickInsideSearchInput = e.target.closest(
          ".find-country__search"
        );

        const clickTheTitle = e.target.closest(".title");

        const expandIcon = document.querySelector(
          ".find-country__filter-icons"
        );

        const expandIconSronlyText = expandIcon.querySelector(".sr-only");

        //if the user clicks outside of the filter countries close the drop down
        if (
          !insideFilterCountries &&
          !clickDarkMode &&
          !clickInsideSearchInput &&
          !clickTheTitle
        ) {
          if (expandIconSronlyText.innerText.includes("expand")) {
            const targetIconElement =
              expandIconSronlyText.previousElementSibling;

            targetIconElement.classList.remove("fa-chevron-down");
            targetIconElement.classList.add("fa-chevron-up");
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

  _addHandlerHandleDropDown() {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        const filterContainer = e.target.closest(
          ".find-country__filter-countries__wrapper"
        );

        /*return from the function when the user clicks outside of the collapse icon*/
        if (!filterContainer) return;

        const targetElement = this._parentElement.querySelector(".sr-only");
        const expandedIcon = targetElement.previousElementSibling;

        if (targetElement.innerText.includes("expanded")) {
          expandedIcon.classList.remove("fa-chevron-down");
          expandedIcon.classList.add("fa-chevron-up");
          this._parentElement.classList.remove("expand-drop-down");
          this._parentElement.classList.add("collapse");

          targetElement.innerText = "arrow collapse";

          setTimeout(() => {
            this._parentElement.classList.remove("collapse");
            this._parentElement.classList.add("not-open");
          }, 500);
        } else if (targetElement.innerText.includes("collapse")) {
          expandedIcon.classList.remove("fa-chevron-up");
          expandedIcon.classList.add("fa-chevron-down");
          this._parentElement.classList.remove("not-open");
          this._parentElement.classList.add("expand-drop-down");

          this._parentElement.classList.remove("collapse");
          targetElement.innerText = "arrow expanded";
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
