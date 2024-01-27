class FilterView {
  parentElement = document.querySelector(".find-country__filter-countries");

  constructor() {
    this.addHandlerShowDropDown();
  }

  addHandlerShowDropDown() {
    this.parentElement.addEventListener(
      "click",
      function (e) {
        const expandIcon = e.target.closest(".find-country__filter-icons");

        /*return from the function when the user clicks outside of the collapse icon*/
        if (!expandIcon) return;

        const targetElement = this.parentElement.querySelector(".sr-only");
        const collapseIcon = targetElement.previousElementSibling;

        console.log(collapseIcon);

        if (targetElement.innerText.includes("collapse")) {
          collapseIcon.classList.remove("fa-chevron-down");
          collapseIcon.classList.add("fa-chevron-up");
          this.parentElement.classList.remove("collapse");
          this.parentElement.classList.remove("not-open");
          this.parentElement.classList.add("expand-drop-down");
          targetElement.innerText = "arrow expand";
        } else if (targetElement.innerText.includes("expand")) {
          collapseIcon.classList.remove("fa-chevron-up");
          collapseIcon.classList.add("fa-chevron-down");
          this.parentElement.classList.remove("expand-drop-down");
          this.parentElement.classList.add("collapse");
          targetElement.innerText = "arrow collapse";

          setTimeout(() => {
            this.parentElement.classList.remove("collapse");
            this.parentElement.classList.add("not-open");
          }, 500);
        }
      }.bind(this)
    );
  }
}

export default new FilterView();
