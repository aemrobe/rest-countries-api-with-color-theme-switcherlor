import filterView from "./view/filterView.js";
import * as model from "./model.js";

const controlDisplayAllCountriesData = async function () {
  try {
    await model.loadAllCountriesData();
  } catch (err) {
    console.log(err);
  }
};

controlDisplayAllCountriesData();
