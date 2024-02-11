import { getJson } from "./helper.js";
import { API_URL } from "./config.js";
import { COUNTRY_DATA_ERR } from "./config.js";

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
  countriesInsideTheRegion: {
    flags: [],
    countries: [],
    populations: [],
    regions: [],
    capitals: [],
  },
  displayedCountryDetail: {},
};

export const loadAllCountriesData = async function () {
  try {
    const data = await getJson(
      `${API_URL}/all?fields=flags,name,capital,population,continents
`,
      "wrong countries url"
    );

    for (let i = 0; i < data.length; i++) {
      state.flags.push(data[i].flags);
      state.countries.push(data[i].name?.common);
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
      `${API_URL}/name/${query}?fields=flags,name,capital,population,continents`,
      `${COUNTRY_DATA_ERR}`
    );

    state.results.capitals = [];
    state.results.flags = [];
    state.results.countries = [];
    state.results.populations = [];
    state.results.regions = [];

    for (let i = 0; i < result.length; i++) {
      state.results.flags.push(
        result[i].flags ? result[i].flags : "No flag Data"
      );
      state.results.countries.push(
        result[i].name?.common ? result[i].name?.common : "No Country Name data"
      );
      state.results.populations.push(
        result[i].population ? result[i].population : "No Population data"
      );
      state.results.regions.push(
        result[i].continents[0] ? result[i].continents : "No Continent data"
      );
      state.results.capitals.push(
        result[i].capital[0] ? result[i].capital : "No Capital City data"
      );
    }
  } catch (err) {
    throw err;
  }
};

export const loadCountriesByRegion = async function (regionQuery) {
  try {
    const result = await getJson(
      `${API_URL}/region/${regionQuery}?fields=flags,name,capital,population,continents`,
      "wrong region data"
    );

    state.countriesInsideTheRegion.capitals = [];
    state.countriesInsideTheRegion.flags = [];
    state.countriesInsideTheRegion.countries = [];
    state.countriesInsideTheRegion.populations = [];
    state.countriesInsideTheRegion.regions = [];

    for (let i = 0; i < result.length; i++) {
      state.countriesInsideTheRegion.flags.push(result[i].flags);
      state.countriesInsideTheRegion.countries.push(
        result[i].name?.common ? result[i].name?.common : "No Country name data"
      );
      state.countriesInsideTheRegion.populations.push(
        result[i].population ? result[i].population : "No Population data"
      );
      state.countriesInsideTheRegion.regions.push(
        result[i].continents[0] ? result[i].continents[0] : "No Continent data"
      );
      state.countriesInsideTheRegion.capitals.push(
        result[i].capital[0] ? result[i].capital[0] : "No Capital City data"
      );
    }
  } catch (err) {
    throw err;
  }
};

export const showCountryDetail = async function (countryElement) {
  try {
    const [result] = await getJson(
      `${API_URL}/name/${countryElement}?fullText=true`,
      `${COUNTRY_DATA_ERR}`
    );

    state.displayedCountryDetail.flag = result.flags;
    state.displayedCountryDetail.countryName = result.name?.common;

    //assigning the value of the nativeName of the country
    if (result.name?.nativeName) {
      const { ...Name } = result.name.nativeName;
      for (const key in Name) {
        if (Name.hasOwnProperty(key)) {
          state.displayedCountryDetail.nativeName = Name[key].common;

          break;
        }
      }
    } else {
      state.displayedCountryDetail.nativeName = "No Native Name";
    }

    state.displayedCountryDetail.population = result.population;
    state.displayedCountryDetail.region = result.region;
    state.displayedCountryDetail.subRegion = result.subregion
      ? result.subregion
      : "No subregion";
    state.displayedCountryDetail.capital = result.capital
      ? result.capital
      : "No capital City";
    state.displayedCountryDetail.topLevelDomain = result.tld[0]
      ? result.tld[0]
      : "No TLD";

    //assigning the value of the currency of the country
    if (result.currencies) {
      const { ...currency } = result.currencies;
      for (const key in currency) {
        state.displayedCountryDetail.currency = currency[key].name;

        break;
      }
    } else {
      state.displayedCountryDetail.currency = "No Currency data";
    }

    //assigning the value of the language of the country
    if (result.languages) {
      const { ...language } = result.languages;

      let languages = [];

      for (const key in language) {
        languages.push(language[key]);
      }

      state.displayedCountryDetail.languages = languages.join(", ");
    } else {
      state.displayedCountryDetail.languages = "No Language data";
    }

    //assigning the value of the border of the country
    let borderCountries = result.borders;

    const fetchBorderCountry = async function (borderCode) {
      const res = await fetch(`${API_URL}/alpha/${borderCode}`);

      const [data] = await res.json();

      return data.name.common;
    };

    if (borderCountries && borderCountries.length > 0) {
      borderCountries = await Promise.all(
        borderCountries?.map(async (bordercode) => {
          return await fetchBorderCountry(bordercode);
        })
      );

      state.displayedCountryDetail.borderCountries = borderCountries;
    } else {
      state.displayedCountryDetail.borderCountries = ["No Border Country"];
    }
  } catch (err) {
    throw err;
  }
};
