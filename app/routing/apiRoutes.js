// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on Super friends, etc.
// ===============================================================================
var path = require("path");
var friends = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

app.get('/app/data/friends', function(req, res) {
  res.json(friends);
});

// Add new friend entry
app.post("/app/data/:friends", function(req, res) {
  //var chosen = req.params.friends;
  console.log('entering app.post to add friend');
  var chosen = req.body;

  console.log(chosen);

  var userResponses = chosen["scores[]"];

  // Compute best super friend match

  var matchName = '';
  var matchRole = '';
  var matchAge = '';
  var matchForcepoints = '';
  var matchLikes = '';
  var matchDislikes = '';
  var matchImage = '';
  var totalDifference = 10000; // make the initial value big for comparison

  // Examine all existing friends in the list
    for (var i = 0; i < friends.length; i++) {
      // console.log('friend = ' + JSON.stringify(friends[i]));

      // Compute differenes for each question
      var diff = 0;
      for (var j = 0; j < userResponses.length; j++) {
        diff += Math.abs(friends[i].scores[j] - userResponses[j]);
      }
      // console.log('diff = ' + diff);

      // If lowest difference, record the friend match
      if (diff < totalDifference) {
        // console.log('Closest match found = ' + diff);
        // console.log('Friend name = ' + friends[i].name);
        // console.log('Friend image = ' + friends[i].photo);

        totalDifference = diff;
        matchName = friends[i].name;
        matchRole = friends[i].role;
        matchAge = friends[i].age;
        matchForcepoints = friends[i].forcepoints;
        matchLikes = friends[i].likes;
        matchDislikes = friends[i].dislikes;
        matchImage = friends[i].photo;
      }
    }

// Add new user
    friends.push(chosen);

    // Send appropriate response
res.json({status: 'OK', 
          matchName: matchName, 
          matchRole: matchRole,
          matchAge:  matchAge,
          matchForcepoints: matchForcepoints,
          matchLikes: matchLikes,
          matchDislikes: matchDislikes,
          matchImage: matchImage,
          friends: friends
        });

//  return res.json(friends);
});

// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate JavaScript array
// (ex. User fills out a reservation request... this data is then sent to the server...
// Then the server saves the data to the superFriends array)
// ---------------------------------------------------------------------------

// Create New Friends - takes in JSON input
//app.post("/app/data/friends", function(req, res) {
//  var newfriend = req.body;
//  newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();

//  console.log(newfriend);

//  friends.push(newfriend);

//  res.json(newfriend);
//});
}