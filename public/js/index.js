
// Get references to page elements
var $exampleText = $("#example-text");
var $includeBtn = $("#submit");
var $exampleList = $("#example-list");

var apiKey = "9218f6774ee57be1bff457242b1d7946";

/* 
//$(".chosen-selected").chosen();
var queryStr = "";

$("#add-filter").on("click", function(event){
  event.preventDefault(); 
  //var filter = $("#search-dropdown").val();
  var filter = document.getElementById("search-dropdown").value;
  switch (filter) {
    case "1":
      queryStr += "&query=" + myTrim($("#example-text").val());
      break;
    case "2":
      queryStr += "&query=" + myTrim($("#example-text").val());
      break;
    case "3":
      queryStr += "&year=" + myTrim($("#example-text").val());
      break;
  }
  $(".filters-div").append("<span>" + ($("#example-text").val() + "  " + "</span>"));
  $("#example-text").val("");
});

$("#submit").on("click", function(event){
  event.preventDefault();
  queryStr = "https://api.themoviedb.org/3/search/movie?api_key=9218f6774ee57be1bff457242b1d7946" 
            + queryStr;
  //console.log(queryStr);
  $.ajax({
    url: queryStr,
    method: "GET"
  }).then(function(response){
    //tmdb response here!!
    console.log(response);
  });
  queryStr = "";
  $(".filters-div").empty();
}) 

function myTrim(str){
  return str.split(" ").join("%20");
}

 */




/* 
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
 */
/* function showCustomLists() {
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
} */






$(document).ready(function() {
  //showCustomLists();
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

var displaySrcResults = function(){
  event.preventDefault();
  var filter = $("#search-dropdown").val();
  var query = $("#example-text").val();
  //API URLs to be used for switch 
  var titleUrl = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query="+query+"&page=1&include_adult=false";
  var actorURL = "https://api.themoviedb.org/3/search/person?api_key="+apiKey+"&language=en-US&query="+query+"&page=1&include_adult=false";
  var yearURL =  "https://api.themoviedb.org/3/discover/movie?api_key="+apiKey+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year="+query;
  var tvURL = "https://api.themoviedb.org/3/search/tv?api_key="+apiKey+"&language=en-US&query="+query+"&page=1"

    //switch case statement will check the filter and execute the corresponding API call

     switch(filter){
       //filter = title/general
      case "1":
      $.ajax({
        url: titleUrl,
        method: "GET"
      }).then(function(response){
        
        var movieArr = response.results;
        parseMovArr(movieArr);
      })
      break;
      //filter = actors
      case "2":
      $.ajax({
        url: actorURL,
        method: "GET"
      }).then(function(response){
        
        var actArr = response.results;
        var popRolesArr = response.results[0].known_for;
        parseActArr(actArr, popRolesArr);
      })
      break;
      //filter = years
      case "3":
      $.ajax({
        url: yearURL,
        method: "GET"
      }).then(function(response){
        
        var yearArr = response.results;
        parseYearArr(yearArr);
      })
      break;
      //filter = television
      case "4":
      $.ajax({
        url: tvURL,
        method: "GET"
      }).then(function(response){
        
        var tvArr = response.results;
        parseTvArr(tvArr);
      })
    }
};

var movieArray = [];
var sendMovieId;


//append to handlebars/render when I figure it out
var parseMovArr = function(arr){
  console.log(arr)
  $("#div-header").text("Search Results");

  for(var i=0;i<arr.length; i++){
    
    var infoObj={
      id: arr[i].id,
      title: arr[i].title,
      overview: arr[i].overview,
      poster_path: arr[i].poster_path,
      release: arr[i].release_date,
      genre_ids: arr[i].genre_ids
    };

    movieArray.push(infoObj);

    var imgURL = "https://image.tmdb.org/t/p/w300"+infoObj.poster_path;
    //then push to handlebars
    var emptyEl = $("<div>");
    var img = $("<img>").attr("src", imgURL).attr("class", "movie_poster");
    var titleEl = $("<p>").text(infoObj.title);
    var overviewEl = $("<p>").text(infoObj.overview);
    var releaseEl = $("<p>").text("Release Date:"+infoObj.release);
    var addButton = $("<a>").html("<i class='fas fa-plus'></i>")
                      .attr("data-movieId", infoObj.id).attr("class", "addtocat").attr("href", "#ex1").attr("rel","modal:open");

    
    

    $("#resultscatcher").append(emptyEl);
    emptyEl.append(img).append(titleEl).append(addButton).append(releaseEl).append(overviewEl); 
  };
};

var parseActArr = function(arr1, arr2){

  //grab info from known roles
  for(var j=0;j<arr2.length; j++){
    var popRolesInfo = {
      movieID: arr2[j].id,
      title: arr2[j].title,
      overview: arr2[j].overview,
      posterURL: arr2[j].poster_path,
      release: arr2[j].release_date,
      genre_ids: arr[i].genre_ids
    };
    var imgURL = "https://image.tmdb.org/t/p/w300"+popRolesInfo.posterURL;
    //code here to push to handlebars file
    var emptyEl = $("<div>");
    var relatedEl = $("<h5>").text("Popular Roles");
    var img = $("<img>").attr("src", imgURL);
    var titleEl = $("<p>").text(popRolesInfo.title);
    var overviewEl = $("<p>").text(popRolesInfo.overview);
    var releaseEl = $("<p>").text("Release Date:"+popRolesInfo.release);
    var addButton = $("<button>").text("Add to Subcategory").attr("value", popRolesInfo.movieID).attr("class", "addtocat");

    $("#resultscatcher").append(emptyEl);
    emptyEl.append(relatedEl).append(img).append(titleEl).append(releaseEl).append(overviewEl).append(addButton);    
  };

  for(var i=0;i<arr1.length; i++){
    var infoObj={
      actorID: arr1[i].id,
      name: arr1[i].name,
      picture: arr1[i].profile_path
    };
    //code here to push to handlebars file
    var imgURL = "https://image.tmdb.org/t/p/w300"+infoObj.picture;
    var empty = $("<div>");
    var image = $("<img>").attr("src", imgURL);
    var name = $("<p>").attr("value", infoObj.actorID);

    $("#image").append(empty);
    empty.append(name).append(image).append()
  };
};

var parseYearArr = function(arr){

  $("#div-header").text("Search Results");
  
  for(var i=0;i<arr.length; i++){
    var infoObj={
      movieID: arr[i].id,
      title: arr[i].title,
      overview: arr[i].overview,
      posterURL: arr[i].poster_path,
      release: arr[i].release_date,
      genre_ids: arr[i].genre_ids
    };
    //then push to handlebars
    var imgURL = "https://image.tmdb.org/t/p/w300"+infoObj.posterURL;
    //then push to handlebars
    var emptyEl = $("<div>");
    var img = $("<img>").attr("src", imgURL);
    var titleEl = $("<p>").text(infoObj.title);
    var overviewEl = $("<p>").text(infoObj.overview);
    var releaseEl = $("<p>").text("Release Date:"+infoObj.release);
    var addButton = $("<button>").text("Add to Subcategory").attr("value", infoObj.movieID).attr("class", "addtocat");

    $("#resultscatcher").append(emptyEl);
    emptyEl.append(img).append(titleEl).append(releaseEl).append(overviewEl).append(addButton);

  };
};

var parseTvArr = function(arr){
  console.log(arr)
  $("#div-header").text("Search Results");
  for(var i=0;i<arr.length; i++){
    var infoObj={
      tvID: arr[i].id,
      title: arr[i].original_name,
      overview: arr[i].overview,
      posterURL: arr[i].poster_path,
      release: arr[i].first_air_date     
    };
    //then push to handlebars
    var imgURL = "https://image.tmdb.org/t/p/w300"+infoObj.posterURL;
    //then push to handlebars
    var emptyEl = $("<div>");
    var img = $("<img>").attr("src", imgURL);
    var titleEl = $("<p>").text(infoObj.title);
    var overviewEl = $("<p>").text(infoObj.overview);
    var releaseEl = $("<p>").text("Release Date:"+infoObj.release);
    var addButton = $("<button>").text("Add to Subcategory").attr("value", infoObj.tvID).attr("class", "addtocat");

    $("#resultscatcher").append(emptyEl);
    emptyEl.append(img).append(titleEl).append(releaseEl).append(overviewEl).append(addButton);
  };
};
// Add event listeners to the submit and delete buttons

$includeBtn.on("click", handleFormSubmit, displaySrcResults);

$exampleList.on("click", ".delete", handleDeleteBtnClick);

$(document).on("click", ".addtocat", function(){
  sendMovieId = $(this).attr("data-movieId");
  console.log("sendMovieId", sendMovieId);
})

$(".addToThisList").on("click", function(){
  console.log(sendMovieId);
  var route = "/api/" + $(this).attr("data-listId");
  var movieData;
  for (var i = 0; i < movieArray.length; i++){
    console.log(movieArray[i]);
    if (movieArray[i].id == sendMovieId) {
      movieData = movieArray[i];
    }
  }
  console.log(movieData);
  $.ajax(route, {
    type: "POST",
    data: {
          movies: [movieData]
    }
  });
}); 

////////////////////////TODO/////////////////////

//GRAB RELEVANT INFO FROM JSON OBJECT AND PASS TO HANDLEBARS
