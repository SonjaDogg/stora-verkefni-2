'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // runs when the DOM content has loaded

  // initializes the program object where all the logic happens

  program.init();
});

var program = function () {

  var nylegm;
  var kennslum;
  var skemmtim;

  function init() {
    // searches the html document for html tags
    nylegm = document.querySelector('.nylegm');
    kennslum = document.querySelector('.kennslum');
    skemmtim = document.querySelector('.skemmtim');

    // fetches data from json files and constructs the html
    fetchData();
  }
  function fetchData() {
    var request = new XMLHttpRequest();
    request.open('GET', 'videos.json', true);

    // runs a fuction to add the data to the html when request has retuned data
    request.onload = function () {
      // converts the response to a json object to be able to use it
      var data_from_json_videos = JSON.parse(request.response);

      // creates a variable with data from the categories
      var ny = data_from_json_videos.categories[0];
      empty(nylegm);
      displayData(data_from_json_videos, nylegm, ny);

      var kenns = data_from_json_videos.categories[1];
      empty(kennslum);
      displayData(data_from_json_videos, kennslum, kenns);

      var skem = data_from_json_videos.categories[2];
      empty(skemmtim);
      displayData(data_from_json_videos, skemmtim, skem);

      //displayData(data_from_json_videos)
    };
    request.send();
  }

  // Takes in data from json file and
  function displayData(data, htmlCategory, category) {
    var videosInCategory = category.videos;
    var videos = data.videos;
    console.log("videos " + videos);

    // creates the header and gives it the title
    var header = document.createElement('h1');
    header.appendChild(document.createTextNode(category.title));

    // creates showcase div element
    var showcase_div = document.createElement('div');
    showcase_div.classList.add('showcase');

    // iterates through all videos in category
    for (var i = 0; i < videosInCategory.length; i++) {
      var videoIndex = videosInCategory[i];

      // finds video data for the caregory at this index
      var dataForCategory = getVideoAtIndex(videoIndex, videos);
      // creates the movie div that goes into showcase div
      var movieDiv = constructMovieDiv(dataForCategory);
      // adds the movie div to html
      showcase_div.appendChild(movieDiv);
    }
    // adding the card to the parent html (nylegm, skemmtim kennslum)
    htmlCategory.appendChild(header);
    htmlCategory.appendChild(showcase_div);
  }
  // finds the video in json by index number
  function getVideoAtIndex(index, videoArray) {

    for (var i = 0; i < videoArray.length; i++) {
      var videoData = videoArray[i];

      if (videoData.id === index) {
        return videoData;
      }
    }
  }

  function constructMovieDiv(dataForVideo) {
    // Make a new image html tag
    var timePassed = dataForVideo.created;
    console.log("timePassed " + timePassed);

    //Getting today's date in milliseconds
    var d = new Date();
    var n = d.getTime();
    console.log("milli " + n);

    //Computing difference between current date and created date
    //and changing to years, months, weeks and days
    var days = Math.floor((n - timePassed) / 1000 / 86400);
    var weeks = Math.floor(days / 7);
    var months = Math.floor(days / 52);
    var years = Math.floor(days / 365.25);

    console.log("years " + years);
    console.log("months " + months);
    console.log("weeks " + weeks);
    console.log("days " + days);

    //Deciding what should be printed out below video
    if (years >= 1) timePassed = "Fyrir " + years + " árum síðan";else if (months >= 1) {
      if (months === 1) timePassed = "Fyrir " + months + " mánuði síðan";else timePassed = "Fyrir " + months + " mánuðum síðan";
    } else if (weeks >= 1) timePassed = "Fyrir " + weeks + " vikum síðan";else if (days >= 1) timePassed = "Fyrir " + days + " dögum síðan";

    // making html structure
    var movie_div = document.createElement('div');
    movie_div.classList.add('movie');

    var movie_img_div = document.createElement('div');
    movie_img_div.classList.add('movie__image');

    var movie_info_div = document.createElement('div');
    movie_info_div.classList.add('movie__info');

    var img_tag = document.createElement('img');
    // Adding a new attribute to link the actual image
    img_tag.setAttribute('src', dataForVideo.poster);
    // adding the css class for the movie image

    var movie_title_text = document.createElement("p");
    movie_title_text.classList.add('title');
    movie_title_text.appendChild(document.createTextNode(dataForVideo.title));

    var movie_info_text = document.createElement("p");
    movie_info_text.classList.add('info');

    movie_info_text.appendChild(document.createTextNode(timePassed));

    movie_img_div.appendChild(img_tag);
    movie_div.appendChild(movie_img_div);

    movie_info_div.appendChild(movie_title_text);
    movie_info_div.appendChild(movie_info_text);
    movie_div.appendChild(movie_info_div);

    return movie_div;
  }
  // clears elements already present in html
  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  return {
    init: init
  };
}();

//# sourceMappingURL=script-compiled.js.map