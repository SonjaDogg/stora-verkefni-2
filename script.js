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
    request.onload = function() {
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
    }
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
      var videoData = videoArray[i]

      if (videoData.id === index) {
        return videoData;
      }
    }
  }

  function constructMovieDiv(dataForVideo) {

    // making html structure
    var movie_div = document.createElement('div');
    movie_div.classList.add('movie');

    var clickable_container = document.createElement('a');
    clickable_container.setAttribute('href', 'videos.html' + '?id=' + dataForVideo.id);
    var movie_img_div = document.createElement('div');
    movie_img_div.classList.add('movie__image');

    var movie_info_div = document.createElement('div');
    movie_info_div.classList.add('movie__info');

    var img_tag = document.createElement('img');

    // Adding a new attribute to link the actual image
    img_tag.setAttribute('src', dataForVideo.poster);

    var time_overlay = document.createElement('p');
    // time_overlay.appendChild(document.createTextNode(showTime(dataForVideo.duration)));
    time_overlay.setAttribute(showTime(dataForVideo.duration));
    console.log("timi " + showTime(dataForVideo.duration));

    // adding the css class for the movie image
    var movie_title_text = document.createElement("p");
    movie_title_text.classList.add('title');
    movie_title_text.appendChild(document.createTextNode(dataForVideo.title));

    var movie_info_text = document.createElement("p");
    movie_info_text.classList.add('info');

    movie_info_text.appendChild(document.createTextNode(showDate(dataForVideo.created)));

    movie_img_div.appendChild(img_tag);
    clickable_container.appendChild(movie_img_div);
    movie_div.appendChild(clickable_container);

    movie_info_div.appendChild(movie_title_text);
    movie_info_div.appendChild(movie_info_text);
    movie_div.appendChild(movie_info_div);

    return movie_div;

  }

  function showDate(movieDate) {
    /** calculates the difference of time between the creation of the video and
        the current time when the script is run
    **/
    var diff = (Date.now() - movieDate) / 1000;

      const diff_y = Math.floor(diff / (60 * 60 * 24 * 30 * 12));
      const diff_m = Math.floor((diff / (60 * 60 * 24 * 30)) % 12);
      const diff_w =  Math.floor((diff / (60 * 60 * 24 * 7)) % 30);
      const diff_d =  Math.floor((diff / (60 * 60 * 24)) % 7);
      const diff_h = Math.floor((diff / (60 * 60)) % 24);

    // selects the correct sentence to show
    switch (true) {
      case (diff_y !== 0 && diff_y === 1):
        return 'Fyrir ' + diff_y + ' ári síðan';
        break;
      case (diff_y !== 0 && diff_y !== 1):
        return 'Fyrir ' + diff_y + ' árum síðan';
        break;
      case (diff_y === 0 && diff_m === 1):
          return 'Fyrir ' + diff_m + ' mánuði síðan';
          break;
      case (diff_y === 0 && diff_m !== 1 && diff_m > 1):
        return 'Fyrir ' + diff_m + ' mánuðum síðan';
        break;
      case (diff_y === 0 && diff_m === 0 && diff_w === 1):
        return 'Fyrir ' + diff_w + ' viku síðan';
        break;
      case (diff_y === 0 && diff_m === 0 && diff_w !== 1 && diff_w > 1):
        return 'Fyrir ' + diff_w + ' vikum síðan';
        break;
      case (diff_y === 0 && diff_m === 0 && diff_w === 0 && diff_d === 1):
          return 'Fyrir ' + diff_d + ' degi síðan';
          break;
      case (diff_y === 0 && diff_m === 0 && diff_w === 0 && diff_d !== 1 && diff_d > 1):
        return 'Fyrir ' + diff_d + ' dögum síðan';
        break;
      case (diff_y === 0 && diff_m === 0 && diff_w === 0 && diff_d === 0 && diff_h === 1):
          return 'Fyrir ' + diff_h + ' klukkustund síðan';
          break;
      default:
        return 'Fyrir ' + diff_h + ' klukkustundum síðan';
    }
  }

  function showTime(movieTime) {
    //Changes seconds to minutes and seconds
    var minutes = Math.floor(movieTime / 60);
    var seconds = movieTime - Math.floor(movieTime / 60) * 60;
    console.log("min " + minutes);
    console.log("sec " + seconds);

    //Adds a '0' in front of seconds if only 1 digit
    if (seconds.toString().length === 1) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
  }

  // clears elements already present in html
  function empty(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  return {
    init: init
  }
})();
