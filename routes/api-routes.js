require("dotenv").config();
const KEY = process.env.KEY;
const HOST = process.env.HOST;
const axios = require('axios');

module.exports = function(app) {
    app.get("/api/search/:test", (req,res) => {
    
        let test = req.params.test;

        let url = "https://wordsapiv1.p.rapidapi.com/words/"+test+"/definitions";

        axios.get(url,{
        "async": true,
        "crossDomain": true,
        
        "method": "GET",
        "headers":{
            "x-rapidapi-key": KEY,
            "x-rapidapi-host": HOST
        }
        })
        .then(response => res.json(response.data.definitions[0]))
        .catch(err => console.log(err))  
    });
};