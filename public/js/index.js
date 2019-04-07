// Get references to page elements
var $exampleText = $("#example-text");
var $includeBtn = $("#include");
var $exampleList = $("#example-list");


$("#standards-header").text("VIEW YOUR CUSTOM LISTS");

var customCategories = [
  {
    category: "Asian Action",
    titles: ["Oldboy", "A Bittersweet Life", "War of the Arrows"]
  }, {
    category: "Marvel Universe",
    titles: ["Ant-Man", "Black Panther", "Guardians of the Galaxy"]
  }, {
    category: "Mockumentaries",
    titles: ["The Conspiracy", "Best in Show", "I'm Still Here"]
  }, {
    category: "Film Noir",
    titles: ["Pickup", "The Killers", "Maltese Falcon"]
  }
];

function showCustomLists() {
  for(var i = 0; i < customCategories.length; i++) {
    var element = '<div class="col lg3"><img class="img thumbnail center-block movie-poster" src="images/';
    element += customCategories[i].titles[0] + '.jpg';
    element += '" alt="';
    element += customCategories[i].category;
    element += ' poster"><p class="text-center"><a class="btn btn-primary btn-lg" href="#" role="button"><span class="fa fa-envelope"></span>';
    element += customCategories[i].category;
    element += '</a></p></div>';
    $("#stock-genres").append(element);
  }
}

$(document).ready(function() {
  showCustomLists();
  $('select').formSelect();
});

// The API object contains methods for each kind of request we'll make
var API = {
  search: function(input) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "GET",
      url: "/api/search",
      data: input
    });    
  },
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

  var input = $("#example-text").val();
  console.log("INPUT: ", input);
  // var example = {
  //   text: $exampleText.val().trim(),
  //   include: true
  // };
  
  // if(event.target.innerHTML === "Exclude") {
  //   example.include = false;
  // }

  // if (!(example.text)) {
  //   alert("You must enter a keyword!");
  //   return;
  // }

  // API.saveExample(example).then(function() {
  //   refreshExamples();
  // });
  
  API.search(input).then(function(data) {
    console.log("SEARCH: ", data);
  });

  // $exampleText.val("");
  // example.include = true;
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
$includeBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
