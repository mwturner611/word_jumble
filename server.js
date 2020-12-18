require("dotenv").config();
const express = require("express");
const path = require("path");
const KEY = process.env.KEY;
const HOST = process.env.HOST;
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// api routes
require('./routes/api-routes.js')(app);

app.listen(PORT, () => {
    console.log("App listening on Port " + PORT);
});