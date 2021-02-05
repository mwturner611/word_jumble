// reference packages- dotenv,express,path,axios
require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require('axios');

// get secret keys for api call
const KEY = process.env.KEY;
const HOST = process.env.HOST;

// activate express and use Port either locally or hosted
const app = express();
const PORT = process.env.PORT || 8080;

// express middleware enabling JSON-like experience with objects and arrays
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Static directory - service up the files in public folder by default
app.use(express.static("public"));

// api routes in this folder
require('./routes/api-routes.js')(app);

// start up the server on this port
app.listen(PORT, () => {
    console.log("App listening on Port " + PORT);
});