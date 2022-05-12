require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` })
const express = require("express");
const { studentRoute } = require('../src/route/student');

const app = express();
app.use(express.json());
app.use(studentRoute);

module.exports = { app }