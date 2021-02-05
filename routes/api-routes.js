// require packages and secret key and host
require("dotenv").config();
const KEY = process.env.KEY;
const HOST = process.env.HOST;
const axios = require('axios');

// export the api calls for access on the server file
module.exports = function(app) {

    // get route accessed by client side request, make it an async function enabling await key word
    app.get("/api/search/:test", async (req,res) => {
    
        // get word sent by client side
        let test = req.params.test;

        // create our url request to words api with definition request of word
        let url = "https://wordsapiv1.p.rapidapi.com/words/"+test+"/definitions";

        // wrap in try-catch to handle errors
        try {
            // await response of axios get call to url with secure headers
            const response = await axios.get(url,{
                "async": true,
                "crossDomain": true,
                
                "method": "GET",
                "headers":{
                    "x-rapidapi-key": KEY,
                    "x-rapidapi-host": HOST
                }
                })
                // send first definition response to client side
                await res.json(response.data.definitions[0]);
        }catch(error){
            // if it has an error, tell the client that word doesn't have a definition
            res.send({definition:"No definition could be found for this word"})
        }  
    });
};