const axios = require("axios");
const NodeCache = require("node-cache");
require("dotenv").config();
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 3600 });
const apiUrl = process.env.API_URL;
const apiKey = process.env.CALENDARIFIC_API_KEY;

const fetchHolidays = async (country, year) => {
  const cacheKey = `${country}_${year}_holidays`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  } else {
    const response = await axios.get(`${apiUrl}/holidays`, {
      params: {
        api_key: apiKey,
        country,
        year,
      },
    });
    const holidays = response.data.response.holidays;
    cache.set(cacheKey, holidays);
    return holidays;
  }
};

const fetchCountries = async () => {
  const cacheKey = "countries";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  } else {
    const response = await axios.get(`${apiUrl}/countries`, {
      params: { api_key: apiKey },
    });
    const countries = response.data.response.countries;
    cache.set(cacheKey, countries);
    return countries;
  }
};

module.exports = { fetchHolidays, fetchCountries };
