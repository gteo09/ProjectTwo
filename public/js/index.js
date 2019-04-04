// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

$("#standards-header").text("BROWSE STANDARD GENRES");

// TODO: This variable should be a MySql database
var standardGenres = [
  {
    genre: "Action",
    poster: "Kingsman.jpg"
  }, {
    genre: "Adventure",
    poster: "Raiders.jpg"
  }, {
    genre: "Animation",
    poster: "Zelda.jpg"
  }, {
    genre: "Classic",
    poster: "Casablanca.jpg"
  }, {    
    genre: "Comedy",
    poster: "Borat.jpg"
  }, {
    genre: "Documentary",
    poster: "Penguins.jpg"
  }, {
    genre: "Fantasy",
    poster: "Pans Labyrinth.jpg"
  }, {
    genre: "Foreign",
    poster: "La Dolce Vita.jpg"
  }, {
    genre: "Horror",
    poster: "Halloween.jpg"
  }
];
function populateStandardGenres() {
  const first = '<div class="col lg3"><img class="img thumbnail center-block movie-poster" src="images/';
  const second = '" alt="';
  const third = 'poster"><p class="text-center"><a class="btn btn-primary btn-lg" href="#" role="button"><span class="fa fa-envelope"></span>';
  const fourth = '</a></p></div>';
  for(var i = 0; i < standardGenres.length; i++) {
    $("#stock-genres").append(first + standardGenres[i].poster + second + standardGenres[i].genre + third + standardGenres[i].genre + fourth);
  }
}
$(document).ready(function() {
  populateStandardGenres();
});


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
