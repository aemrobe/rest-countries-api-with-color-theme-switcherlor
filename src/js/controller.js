import filterView from "./view/filterView.js";
import * as model from "./model.js";
import displayCountryView from "./view/displayCountryView.js";
import searchResultView from "./view/searchResultView.js";

const controlDisplayAllCountriesData = async function () {
  try {
    displayCountryView.renderSpinner();

    await model.loadAllCountriesData();

    displayCountryView._render({
      flags: model.state.flags,
      countries: model.state.countries,
      regions: model.state.regions,
      capitals: model.state.capitals,
      populations: model.state.populations,
    });
  } catch (err) {
    console.log(err);
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchResultView._getQuery();

    if (!query) return;

    searchResultView.renderSpinner();

    await model.loadSearchResult(query);

    searchResultView._render(model.state.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  controlDisplayAllCountriesData();
  searchResultView._addHandlerSearchResult(controlSearchResult);
};

init();
