const { fetchHolidays, fetchCountries } = require("../services/holidayService");

const getHolidays = async (req, res) => {
  const { country, year } = req.query;
  try {
    const holidays = await fetchHolidays(country, year);
    res.json(holidays);
  } catch (error) {
    console.error("Failed to fetch holidays:", error.message); 
    res.status(500).json({ message: "Failed to fetch holidays" });
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await fetchCountries();
    res.json(countries);
  } catch (error) {
    console.error("Failed to fetch countries:", error.message);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

module.exports = { getHolidays, getCountries };
