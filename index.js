// requirements
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");
    var db = require("./models");
    var views = path.join(process.cwd(), "/public/views");


// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/node_modules'));

// body parser config

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("bower_components"));


// ROUTES
// root path
app.get("/", function (req, res){
  // render index.html?????? 
  var homePath = path.join(views, '/index.html');
  res.sendFile(homePath);
  console.log('got home path');
});

// phrases index path
app.get("/phrases", function (req, res){
  //this is working, according to console.logs?
  console.log('about to send info from server');
  db.Phrase.find({},
    function (err, phrases) {
    res.send(JSON.stringify(phrases));
    console.log('server has sent response');
    });
  
});

app.post("/update", function(req, res){
  console.log("updating phrase with these params", req.body);
  // not using findByIdAndUpdate because I want to individually check
  // if we have new values for our word, definition
  db.Phrases.findById(req.body.id, function (err, phrase) {
    if (err) {
      res.status(500).send({ error: 'database find error' });
    } else {
      if (req.body.word) {
        // if form gave us a new word, update the phrase's word
        phrase.word = req.body.word;
      }
      if (req.body.definition){
        // if form gave us a new definition, update that
        phrase.definition = req.body.definition;
      }
      // save the updated document
      phrase.save(function (err) {
        if (err){
          res.status(500).send({ error: 'database save error' });
        }
      });
    }
  });
  res.status(200).send();
});

app.delete("/phrases/:id", function (req, res){
  // remove item in the db matching the id
  db.Phrases.remove({_id: req.params.id}, function(err, results){
    if (err){
      res.status(500).send({ error: 'database error' });
    } else {
      res.status(200).send();
    }
  });
});

// listen on port 3000
app.listen(3000, function (){
  console.log("Listening on port 3000...");
});