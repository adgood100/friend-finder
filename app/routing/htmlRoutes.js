// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/../public/home.html"));
});

app.get("/app/public/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/../public/survey.html"));
});

// If no matching route is found default to home
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
}