require("dotenv").config({ path: ".env"});
const express = require('express');
require("./database/database")
const app = express();

app.use(express.json());

module.export = app;

