var $submitBtn = $("#search-database");

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

// This is a TMDB api object: search results for 'Cronenberg' 
var searchResults = [ { vote_count: 0,
  id: 338262,
  video: false,
  vote_average: 0,
  title: 'David Cronenberg and the Cinema of the Extreme',
  popularity: 0.841,
  poster_path: null,
  original_language: 'en',
  original_title: 'David Cronenberg and the Cinema of the Extreme',
  genre_ids: [ 99 ],
  backdrop_path: null,
  adult: false,
  overview:
   'A brief documentary about Cronenberg made by the BBC to precede a showing of \'Videodrome\' on television.',
  release_date: '1997-01-19' },
{ vote_count: 2,
  id: 373892,
  video: false,
  vote_average: 8,
  title: 'David Cronenberg: I Have to Make the Word Be Flesh',
  popularity: 0.651,
  poster_path: '/m0fWerxUZWgetnjzK4Yd9tqR8T7.jpg',
  original_language: 'en',
  original_title: 'David Cronenberg: I Have to Make the Word Be Flesh',
  genre_ids: [ 99 ],
  backdrop_path: null,
  adult: false,
  overview:
   '“I Have to Make the Word Be Flesh” is an insightful and candid interview with the man himself about his films and his motivations. Cronenberg is cheerfully frank about his often grotesque images and controversial subject matter, and clearly relishes in the opportunity to explore the themes and motifs behind each one.',
  release_date: '1999-10-20' },
{ vote_count: 1,
  id: 363377,
  video: false,
  vote_average: 9,
  title: 'Long Live the New Flesh: The Films of David Cronenberg',
  popularity: 0.6,
  poster_path: '/8Te0QRu6K9sC6TXJo2i8qYEdGxG.jpg',
  original_language: 'en',
  original_title: 'Long Live the New Flesh: The Films of David Cronenberg',
  genre_ids: [ 99 ],
  backdrop_path: null,
  adult: false,
  overview:
   'Documentary about the career of director David Cronenberg, with clips from his films and interviews with friends, colleagues, film critics and Cronenberg himself.',
  release_date: '1986-01-01' },
{ vote_count: 0,
  id: 580086,
  video: false,
  vote_average: 0,
  title: 'The Making of David Cronenberg\'s Videodrome',
  popularity: 0.6,
  poster_path: null,
  original_language: 'en',
  original_title: 'The Making of David Cronenberg\'s Videodrome',
  genre_ids: [ 99 ],
  backdrop_path: null,
  adult: false,
  overview:
   'A featurette made in 1982 to promote the new film by David Cronenberg, including interviews with the cast and crew.',
  release_date: '1982-12-31' },
{ vote_count: 395,
  id: 2742,
  video: false,
  vote_average: 7.1,
  title: 'Naked Lunch',
  popularity: 8.04,
  poster_path: '/tMninSG4OAAhx9SNjdnMJM1R3Wn.jpg',
  original_language: 'en',
  original_title: 'Naked Lunch',
  genre_ids: [ 80, 18 ],
  backdrop_path: '/yUUHXhYhZTWg9MvHDWhsUJ7Vgc7.jpg',
  adult: false,
  overview:
   'Blank-faced bug killer Bill Lee and his dead-eyed wife, Joan, like to get high on Bill\'s pest poisons while lounging with Beat poet pals. After meeting the devilish Dr. Benway, Bill gets a drug made from a centipede. Upon indulging, he accidentally kills Joan, takes orders from his typewriter-turned-cockroach, ends up in a constantly mutating Mediterranean city and learns that his hip friends have published his work -- which he doesn\'t remember writing.',
  release_date: '1991-12-27' } 
];

var customLists = [
  "Asian Action", "Marvel Universe", "Mockumentaries", "Film Noir"
]

// var customListSelector = function generateCustomListSelector() { 
function generateCustomListSelector() { 
  var selector =  '<div class="input-field col s2"><select>';
  selector += '<option value="" disabled selected>Select list</option>';
  for(var i = 0; i < customLists.length; i++) {
    selector += '<option  value="' + i + '">' + customLists[i] + '</option>';
    console.log("LISTS: ", customLists[i]);
  }
  selector += '</select></div>';

  return selector;
}

function showSearchResults() {
  for(var i = 0; i < searchResults.length; i++) {
    var element = '<section class="row results-row"><h5 class="col s4">';
    element += searchResults[i].title + '</h5><button class="btn read col s3">';
    element += '<button class="btn read col s3">Read synopsis</button>';
    element += generateCustomListSelector();
    element += '<div class="col s2"><button class="btn">Save</button></div>';
    element += '<hr></section>';
    $("#search-results").append(element);
  }
}

function generateCategorySelector() {


  // <div class="input-fiel">
  //   <select>
  //     <option value="" disabled selected>Choose a search option</option>
  //     <option  value="1">Titles</option>
  //     <option value="2">Actors</option>
  //     <option value="3">Years (up to)</option>
  //     <option value="4">Years (since)</option>
  //     <option value="5">Television</option>
  //   </select>
  // </div>
}

$(document).ready(function() {
  showCustomLists();
  $('select').formSelect();
  showSearchResults();

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

    // $exampleList.empty();
    // $exampleList.append($examples);
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
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
