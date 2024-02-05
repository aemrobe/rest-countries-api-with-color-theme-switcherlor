import filterView from "./view/filterView.js";
import * as model from "./model.js";
import displayCountryView from "./view/displayCountryView.js";
import searchResultView from "./view/searchResultView.js";
import showCountryDetailView from "./view/showCountryDetailView.js";
import homePageView from "./view/homePageView.js";

import "regenerator-runtime/runtime";
import "core-js/stable";

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
    displayCountryView._renderErrorMessage(err);
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
    searchResultView._renderErrorMessage(err);
  }
};

const controlSearchFromResult = async function (searchQuery) {
  try {
    displayCountryView.renderSpinner();

    await model.loadSearchResult(searchQuery);

    searchResultView._renderCountry(model.state.results);

    searchResultView._clearSearchInputValue();
  } catch (err) {
    displayCountryView._renderErrorMessage(err);
  }
};

const controlFilterCountriesByRegion = async function (regionQuery) {
  try {
    displayCountryView.renderSpinner();

    await model.loadCountriesByRegion(regionQuery);

    searchResultView._renderCountry(model.state.countriesInsideTheRegion);
  } catch (err) {
    displayCountryView._renderErrorMessage(err);
  }
};

const controlShowCountriesDetail = async function (countryElement) {
  try {
    homePageView._toggle();

    showCountryDetailView._toggle();

    showCountryDetailView.renderSpinner();

    await model.showCountryDetail(countryElement);

    showCountryDetailView._render(model.state.displayedCountryDetail);
  } catch (err) {
    showCountryDetailView._renderErrorMessage(err);
  }
};

const contorlShowBorderCountryDetail = async function (borderCountryElement) {
  try {
    showCountryDetailView.renderSpinner();

    await model.showCountryDetail(borderCountryElement);

    showCountryDetailView._render(model.state.displayedCountryDetail);
  } catch (err) {
    showCountryDetailView._renderErrorMessage(err);
  }
};

const controlBackToTheHomePage = function () {
  homePageView._toggle();
  showCountryDetailView._toggle();
};

const controlBackToTheHomePageWithClickingTheTitle = async function () {
  try {
    showCountryDetailView._hide();
    homePageView._show();

    await controlDisplayAllCountriesData();
  } catch (err) {
    displayCountryView._renderErrorMessage(err);
  }
};

const init = function () {
  controlDisplayAllCountriesData();
  searchResultView._addHandlerSearchResult(controlSearchResult);
  searchResultView._addHandlerSearchFromTheResults(controlSearchFromResult);
  searchResultView._addHandlerSearchFromTheFormSubmitted(
    controlSearchFromResult
  );
  filterView._addHandlerFilterByRegion(controlFilterCountriesByRegion);
  showCountryDetailView._addHanlderShowCountryDetail(
    controlShowCountriesDetail
  );
  showCountryDetailView._addHandlerBackToTheHomePage(controlBackToTheHomePage);
  showCountryDetailView._addHandlerShowBorderCountryDetail(
    contorlShowBorderCountryDetail
  );
  homePageView._addHandlerClickOnWhereInTheWorld(
    controlBackToTheHomePageWithClickingTheTitle
  );
};

init();
