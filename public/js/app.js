// wait for the window to load
$(function () {
  //selecting dom elements & initiating phrases
  var $newPhrase = $("#phrase-ul");
  var $phraseCon = $("#phraseCon");
  var $phrasesForm = $('#phrases-form');

  //template
  var phraseTemp = _.template($("#phraseTemp").html())
  //parse out phrases:: working?? 
  $.get("/phrases").
      done(function (phrases) {
          
        _(phrases).each(function (phrase) {
            var $phrase = $(phraseTemp(phrase));
            $phrase.data("_id", phrase._id);
            $newPhrase.append($phrase);
          });
      });

  // wait for new submit
  $phrasesForm.on("submit", function (e) {
    // prevent the page from reloading
    e.preventDefault();

    // turn form data into a string for front end
    var phraseData = $phrasesForm.serialize();
    console.log('serializing phrase:' + phraseData);

    // POST form data
    $.post("/phrase", phraseData).
      done(function (data) {
        console.log(data);
        // reset the form
        $phrasesForm[0].reset();
        var $phrase = $(phraseTemp(data));

        // add id to $phrase
        $phrase.data("_id", data._id);  // <---- change to _id
        $newPhrase.append($phrase.hide().fadeIn(1100));
      });

  });
//baleeted
  $newPhrase.on("click", ".close", function (e) {
    var $phrase = $(this).closest(".phraseCon");
    var _id = $phrase.data("_id");
    console.log("DELETE", _id);
    $.ajax({
      url: "/phrases/" + _id,
      type: "DELETE"
    }).done(function () {
      //fade out on successful DB deletion
      $phrase.fadeOut(1000, function () {
        //remove from DOM
         $(this).remove();
      });
    });
  });

 $newPhrase.on("click", ".show-button", function (e) {
    $(this).hide();
    var $answer = $(this).next();
    console.log($answer);
    //$answer.css('color', 'red');
    //$answer.hide();
    $answer.addClass('col-md-3').removeClass('col-md-2');
    $answer.addClass('notsecret').removeClass('secret').hide().fadeIn(1000);
  });


});
