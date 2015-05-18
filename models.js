//require, duh
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/phraseDB");

//new schema
var phrasesSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  }
  
});
//takes schema down runway
var Phrase = mongoose.model("Phrases", phrasesSchema);
//dish it up
module.exports.Phrase = Phrase;