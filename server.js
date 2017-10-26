var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
//app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//var friend = require("./app/data/friends.js")
require("./app/routing/apiRoutes.js")(app)
require("./app/routing/htmlRoutes.js")(app)


// Sets up the Express app to handle data parsing

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
