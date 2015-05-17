//require, duh
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/phraseDB");
var db = require("./models");

//new schema
var phraseSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  completed: {
    type: Boolean,
    default: false
  }
});
//takes schema down runway
var Phrase = mongoose.model("Phrase", phraseSchema);
//dish it up
module.exports.Phrase = Phrase;