import { getJson } from "./helper.js";
import { API_URL } from "./config.js";

export const state = {
  flags: [],
  countries: [],
  populations: [],
  regions: [],
  capitals: [],
};

export const loadAllCountriesData = async function () {
  try {
    const data = await getJson(`${API_URL}/all?fields=name,capital,currencies
`);

    console.log(data);
  } catch (err) {
    throw err;
  }
};
