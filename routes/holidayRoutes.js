const express = require("express");
const {
  getHolidays,
  getCountries,
} = require("../controllers/holidayController");
const router = express.Router();

router.get("/holidays", getHolidays);
router.get("/countries", getCountries);

module.exports = router;
