const express = require('express');
const holidayRoutes = require('./routes/holidayRoutes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', holidayRoutes);

module.exports = app;
