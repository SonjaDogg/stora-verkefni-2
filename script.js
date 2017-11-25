document.addEventListener('DOMContentLoaded', function () {
  // runs when the DOM content has loaded

  // initializes the program object where all the logic happens

  program.init();

});

var program = (function() {

  var nylegm;
  var kennslum;
  var skemmtim;

  function init() {
    // searches the whole document for nylegum html tag
    nylegm = document.querySelector('.nylegm');
    kennslum = document.querySelector('.kennslum');
    skemmtim = document.querySelector('.skemmtim');

    fetchData();

  }
  function fetchData() {
    var request = new XMLHttpRequest();
    request.open('GET','videos.json',true);

    request.onload = function() {
      var data_from_json_videos = JSON.parse(request.response);

      var ny = data_from_json_videos.categories[0];
      empty(nylegm);
      displayData(data_from_json_videos,nylegm,ny);

      var kenns = data_from_json_videos.categories[1];
      empty(kennslum);
      displayData(data_from_json_videos,kennslum,kenns);

      var skem = data_from_json_videos.categories[2];
      empty(skemmtim);
      displayData(data_from_json_videos,skemmtim,skem);


      //displayData(data_from_json_videos)
    }
    request.send();
  }

  function displayData(data, htmlCategory, category) {
    console.log(htmlCategory);
    var videosInCategory = category.videos;
    var videos = data.videos;
    console.log("videos " + videos);

    var header = document.createElement('h1');
    header.appendChild(document.createTextNode(category.title));

    var showcase_div = document.createElement('div');
    showcase_div.classList.add('showcase');

    for (var i = 0; i < videosInCategory.length; i++) {
      var videoIndex = videosInCategory[i];
      var dataForCategory = getVideoAtIndex(videoIndex, videos);
      var movieDiv = constructMovieDiv(dataForCategory);
      showcase_div.appendChild(movieDiv);

    }
        // adding the card to the parent html
        htmlCategory.appendChild(header);
        htmlCategory.appendChild(showcase_div);
  }

  function getVideoAtIndex(index, videoArray){

    for (var i = 0; i < videoArray.length; i++) {
      var videoData = videoArray[i]

      if (videoData.id === index) {
        return videoData;
      }
    }
  }

  function constructMovieDiv(dataForVideo) {
    // Make a new image html tag
    var timePassed = dataForVideo.created;
    console.log("timePassed " + timePassed);

    var d = new Date();
    var n = d.getTime();
    console.log("milli " + n);

    var days = Math.floor((n - timePassed) / 1000 / 86400);
    var years = Math.floor(days / 365.25);
    var months = Math.floor(days / 52);
    var weeks = Math.floor(days / 7);

    console.log("years " + years);
    console.log("months " + months);
    console.log("weeks " + weeks);
    console.log("days " + days);



    if (years >= 1) timePassed = "Fyrir " + years + " árum síðan";
    else if (months >= 1) {
      if (months === 1) timePassed = "Fyrir " + months + " mánuði síðan";
      else timePassed = "Fyrir " + months + " mánuðum síðan";
    }
    else if (weeks >= 1) timePassed = "Fyrir " + weeks + " vikum síðan";
    else if (days >= 1) timePassed = "Fyrir " + days + " dögum síðan";

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

  function empty(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  return {
    init: init
  }
})();
