// requirements
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");
    var db = require("./models");
    var views = path.join(process.cwd(), "views");


// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));
// body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("bower_components"));


// ROUTES
// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

// phrases index path
app.get("/phrases", function (req, res){
  // render phrases??
  db.Phrase.find({},
    function (err, phrase) {
      res.send(phrase);
    });
});

app.post("/phrases", function (req, res){
  // grab the word and definition from the form
  var newPhrase = req.body;
  // set a sequential id
  newPhrase.id = phrases[phrases.length - 1].id + 1;
  phrases.push(newPhrase);
  res.send(JSON.stringify(newPhrase));
});

app.delete("/phrases/:id", function(req, res) {
  // set the value of the id
  var targetId = req.params.id;
  // find item in the array matching the id
  var targetItem = _.findWhere(phrases, {id: targetId});
  // get the index of the found item
  var index = phrases.indexOf(targetItem);
  // remove the item at that index, only remove 1 item
  phrases.splice(index, 1);
  // render deleted object
  res.send(JSON.stringify(targetItem));
});

// listen on port 3000
app.listen(3000, function (){
  console.log("Listening on port 3000...");
});