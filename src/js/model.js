import { getJson } from "./helper.js";
import { API_URL } from "./config.js";

export const state = {
  flags: [],
  countries: [],
  populations: [],
  regions: [],
  capitals: [],
  results: {
    flags: [],
    countries: [],
    populations: [],
    regions: [],
    capitals: [],
  },
};

export const loadAllCountriesData = async function () {
  try {
    const data =
      await getJson(`${API_URL}/all?fields=flags,name,capital,population,continents
`);

    for (let i = 0; i < data.length; i++) {
      state.flags.push(data[i].flags);
      state.countries.push(data[i].name.common);
      state.populations.push(data[i].population);
      state.regions.push(data[i].continents[0]);
      state.capitals.push(data[i].capital[0]);
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    const result = await getJson(
      `${API_URL}/name/${query}?fields=flags,name,capital,population,continents`
    );

    console.log("result", result);

    state.results.capitals = [];
    state.results.flags = [];
    state.results.countries = [];
    state.results.populations = [];
    state.results.regions = [];

    console.log("state.result", state.results);
    for (let i = 0; i < result.length; i++) {
      state.results.flags.push(result[i].flags);
      state.results.countries.push(result[i].name.common);
      state.results.populations.push(result[i].population);
      state.results.regions.push(result[i].continents[0]);
      state.results.capitals.push(result[i].capital[0]);
    }

    console.log("state result final", state.results);
  } catch (err) {}
};
