require("dotenv").config();
const KEY = process.env.KEY;
const HOST = process.env.HOST;
const axios = require('axios');

module.exports = function(app) {
    app.get("/api/search/:test", async (req,res) => {
    
        let test = req.params.test;

        let url = "https://wordsapiv1.p.rapidapi.com/words/"+test+"/definitions";

        try {
            const response = await axios.get(url,{
                "async": true,
                "crossDomain": true,
                
                "method": "GET",
                "headers":{
                    "x-rapidapi-key": KEY,
                    "x-rapidapi-host": HOST
                }
                })
                await res.json(response.data.definitions[0]);
        }catch(error){
            res.send({definition:"No definition could be found for this word"})
        }  
    });
};