// wait for the window to load
$(function () {
  //selecting dom elements & initiating phrases
  var $newPhrase = $("#newPhrase");
  var $phraseCon = $("#phraseCon");
  var phrase = [];
  //template
  var phraseTemp = _.template($("#phraseTemp").html())
  //parse out phrases:: working?? 
  $.get("/phrases").
      done(function (phrases) {
          
        _(phrases).each(function (phrase) {
            var $phrase = $(phraseTemp(phrase))
            $phrase.data("_id", phrase._id);
            console.log($phrase.data())
            $phraseCon.
              append($phrase);
          });
      });

  // wait for #newTodo submit
  $newPhrase.on("submit", function (e) {
    // prevent the page from reloading
    e.preventDefault();

    // turn form data into a string we can use
    var phraseData = $newphrase.serialize();

    // POST form data
    $.post("/phrase", phraseData).
      done(function (data) {
        console.log(data);
        // reset the form
        $newPhrase[0].reset();
        var $phrase = $(phraseTemp(data));

        // add id to $phrase
        $phrase.data("_id", data._id);
        $phraseCon.append($phrase);
        phrases.push(data);
      });

  });
//baleeted
  $phraseCon.on("click", ".phraseCon .delete", function (e) {
    var $phrase = $(this).closest(".phraseCon");
    var _id = $phrase.data("_id");
    console.log("DELETE", _id);
    $.ajax({
      url: "/phrases/" +_id,
      type: "DELETE"
    }).done(function () {
      $phrase.remove();
    });
  });
});
