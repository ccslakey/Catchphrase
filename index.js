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
      res.send(phrases);
      console.log('server has sent response');
    });
  
});

app.post("/phrases", function (req, res){
  //create a new phrase in the db and serve it to the page.
  console.log('about to post new phrase');
  db.Phrase.create(req.body, 
    function (err, phrase) {
      res.status(201).send(phrase);
      console.log('server has posted phrase');
    });
});

app.delete("/phrases/:id", function(req, res) {
  //fdelete request and get rid of it
  db.Phrases.findOneAndRemove({
    _id: req.params._id
  }, function (err, phrase) {
    res.sendStatus(204) // success No Content
  });
});

// listen on port 3000
app.listen(3000, function (){
  console.log("Listening on port 3000...");
});