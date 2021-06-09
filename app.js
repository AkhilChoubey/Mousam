const express = require("express");
const https = require("https");
var port = process.env.PORT || 3000;
var app = express();

//app.use(favicon(path.join(__dirname, "favicon.ico")));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.get("/", function (req, res) {
  //res.sendFile(__dirname + "/index.html");
  res.render("index", { data: "" });
  // res.send("Server is running");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const appid = "e1d9fb89234620533b14000d110a198f";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    appid +
    "&units=" +
    units;

  https.get(url, function (response) {
    //console.log(response.statusCode);

    if (response.statusCode === 200) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        res.render("index", { data: weatherData });
        //const weatherDesc = weatherData.weather[0].description;
        //const icon = weatherData.weather[0].icon;
        //const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        // res.write(city + weatherData.main.temp);
        // res.write("Weather Discription is " + weatherDesc);
        // res.write("<img src=" + imgURL + ">");
        //res.sendFile(__dirname + "/index.html");
      });
    } else {
      res.render("index", { data: "0" });
    }
  });
});

app.listen(port, function () {
  console.log("The server is running on port 3000");
});
