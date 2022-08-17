const express = require("express");
const { STATUS_CODES } = require("http");
const { Http2ServerRequest } = require("http2");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended:true}));

app.get("/", function (req, res) {          //use to get the input from user through HTML form
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {  //use to post the data 
    const apikey = "c9658236d24290cd696c387207aa1499";
    const latt = req.body.latitude;
    const long = req.body.longitude;

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" 
                 + latt + "&lon=" + long + "&appid=" + apikey;


    https.get(url, function (response) {
        console.log(response, STATUS_CODES);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            res.write("<h1>The temperature is " + temp + "</h1>");
            res.write("<h1> our current weather status is " + weatherDescription + "</h1>");
            res.send;
        })

    })

})
app.listen(3000, function () {
    console.log("server is running at 3000");
});