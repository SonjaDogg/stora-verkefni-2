'use strict';

var player = function () {
  var videoContainer = void 0;
  var videoIndex = void 0;

  var video = void 0;
  var backHtml = void 0;
  var playHtml = void 0;
  var muteHtml = void 0;
  var fullscreenHtml = void 0;
  var forwardHtml = void 0;

  // clears elements already present in html
  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  // finds the video in json by index number
  function getVideoAtIndex(index, videoArray) {
    var videoData = void 0;
    var i = void 0;
    for (i = 0; i < videoArray.length; i += 1) {
      videoData = videoArray[i];

      if (videoData.id == index) {
        return videoData;
      }
    }
    return 0;
  }

  function bindControls() {
    video = document.querySelector('video');
    backHtml = document.getElementsByClassName('back');
    playHtml = document.getElementsByClassName('play');
    muteHtml = document.getElementsByClassName('mute');
    fullscreenHtml = document.getElementsByClassName('fullscreen');
    forwardHtml = document.getElementsByClassName('next');

    backHtml[0].addEventListener('click', function () {
      video.currentTime -= 3;
    });

    // play and pause controls

    playHtml[0].addEventListener('click', function () {
      if (video.paused) {
        video.play();
        document.getElementById('play_pause').setAttribute('src', 'img/pause.svg');
        video.style.opacity = '1';
        document.getElementById('overlay').style.opacity = '0';
      } else {
        video.pause();
        document.getElementById('play_pause').setAttribute('src', 'img/play.svg');
        video.style.opacity = '0.2';
        document.getElementById('overlay').style.opacity = '1';
      }
    });

    // mute control

    muteHtml[0].addEventListener('click', function () {
      if (video.muted) {
        video.muted = false;
        document.getElementById('mute_unmute').setAttribute('src', 'img/mute.svg');
      } else {
        video.muted = true;
        document.getElementById('mute_unmute').setAttribute('src', 'img/unmute.svg');
      }
    });

    // fullscreen control

    fullscreenHtml[0].addEventListener('click', function () {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    });

    // forward control

    forwardHtml[0].addEventListener('click', function () {
      video.currentTime += 3;
    });
  }

  function constructVideoPlayer(videoData) {
    var spilandimHtml = document.createElement('div');
    var header = document.createElement('h1');
    var screenHtml = document.createElement('div');
    var overlayDiv = document.createElement('div');
    var imgTag = document.createElement('img');
    var videoTag = document.createElement('video');

    spilandimHtml.classList.add('spilandim');
    videoContainer.appendChild(spilandimHtml);

    header.appendChild(document.createTextNode(videoData.title));
    spilandimHtml.appendChild(header);

    screenHtml.classList.add('screen');
    videoContainer.appendChild(screenHtml);

    overlayDiv.setAttribute('id', 'overlay');
    screenHtml.appendChild(overlayDiv);

    imgTag.setAttribute('src', 'img/play.svg');
    imgTag.setAttribute('width', '50');
    overlayDiv.appendChild(imgTag);

    videoTag.setAttribute('src', videoData.video);
    screenHtml.appendChild(videoTag);
  }

  function fetchData() {
    var request = new XMLHttpRequest();
    request.open('GET', 'videos.json', true);

    request.onload = function () {
      // converts the response to a json object to be able to use it
      var dataFromJsonVideos = JSON.parse(request.response);
      var videos = dataFromJsonVideos.videos;
      var data = getVideoAtIndex(videoIndex, videos);
      constructVideoPlayer(data);

      bindControls();
    };
    request.send();
  }

  function init() {
    var url = window.location.search;
    videoIndex = url.split('=')[1];
    videoContainer = document.querySelector('.video_container');

    // Fetching video control elements

    empty(videoContainer);
    fetchData();
  }

  return {
    init: init
  };
}();

var library = function () {
  var nylegm = void 0;
  var kennslum = void 0;
  var skemmtim = void 0;

  // clears elements already present in html
  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  // finds the video in json by index number
  function getVideoAtIndex(index, videoArray) {
    for (var i = 0; i < videoArray.length; i += 1) {
      var videoData = videoArray[i];

      if (videoData.id === index) {
        return videoData;
      }
    }
    return 0;
  }

  function showTime(movieTime) {
    // Changes seconds to minutes and seconds
    var minutes = Math.floor(movieTime / 60);
    var seconds = movieTime - Math.floor(movieTime / 60) * 60;

    // Adds a '0' in front of seconds if only 1 digit
    if (seconds.toString().length === 1) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
  }

  function showDate(movieTime) {
    var d = new Date();
    var n = d.getTime();
    var timePassed = movieTime - 0;

    // Computing difference between current date and created date
    // and changing to years, months, weeks and days
    var days = Math.floor((n - timePassed) / 1000 / 86400);
    var weeks = Math.floor(days / 7);
    var months = Math.floor(days / 52);
    var years = Math.floor(days / 365.25);

    // Deciding what should be printed out below video
    if (years >= 1) {
      if (years === 1) timePassed = 'Fyrir ' + years + ' \xE1ri s\xED\xF0an';else timePassed = 'Fyrir ' + years + ' \xE1rum s\xED\xF0an';
    } else if (months >= 1) {
      if (months === 1) timePassed = 'Fyrir ' + months + ' m\xE1nu\xF0i s\xED\xF0an';else timePassed = 'Fyrir ' + months + ' m\xE1nu\xF0um s\xED\xF0an';
    } else if (weeks >= 1) {
      if (weeks === 1) timePassed = 'Fyrir ' + weeks + ' viku s\xED\xF0an';else timePassed = 'Fyrir ' + weeks + ' vikum s\xED\xF0an';
    } else if (days >= 1) {
      if (days === 1) timePassed = 'Fyrir ' + days + ' degi s\xED\xF0an';else timePassed = 'Fyrir ' + days + ' d\xF6gum s\xED\xF0an';
    }
    return timePassed;
  }

  function constructMovieDiv(dataForVideo) {
    // making html structure
    var movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    var videoHtml = 'videos.html';
    var idForVid = '?id=';
    var clickableContainer = document.createElement('a');
    clickableContainer.setAttribute('href', videoHtml + idForVid + dataForVideo.id);
    var movieImgDiv = document.createElement('div');
    movieImgDiv.classList.add('movie__image');

    var movieInfoDiv = document.createElement('div');
    movieInfoDiv.classList.add('movie__info');

    var imgTag = document.createElement('img');

    // Adding a new attribute to link the actual image
    imgTag.setAttribute('src', dataForVideo.poster);

    // Overlay of the length of the video
    var tOverlay = document.createElement('div');
    tOverlay.classList.add('t_overlay');
    var pLength = document.createElement('p');
    pLength.appendChild(document.createTextNode(showTime(dataForVideo.duration)));
    tOverlay.appendChild(pLength);

    // adding the css class for the movie image
    var movieTitleText = document.createElement('p');
    movieTitleText.classList.add('title');
    movieTitleText.appendChild(document.createTextNode(dataForVideo.title));

    var movieInfoText = document.createElement('p');
    movieInfoText.classList.add('info');

    movieInfoText.appendChild(document.createTextNode(showDate(dataForVideo.created)));

    movieImgDiv.appendChild(imgTag);
    movieImgDiv.appendChild(tOverlay);
    clickableContainer.appendChild(movieImgDiv);
    movieDiv.appendChild(clickableContainer);

    movieInfoDiv.appendChild(movieTitleText);
    movieInfoDiv.appendChild(movieInfoText);
    movieDiv.appendChild(movieInfoDiv);

    return movieDiv;
  }

  // Takes in data from json file and
  function displayData(data, htmlCategory, category) {
    var videosInCategory = category.videos;
    var videos = data.videos;

    // creates the header and gives it the title
    var header = document.createElement('h1');
    header.appendChild(document.createTextNode(category.title));

    // creates showcase div element
    var showcaseDiv = document.createElement('div');
    showcaseDiv.classList.add('showcase');

    // iterates through all videos in category
    for (var i = 0; i < videosInCategory.length; i += 1) {
      var videoIndex = videosInCategory[i];

      // finds video data for the caregory at this index
      var dataForCategory = getVideoAtIndex(videoIndex, videos);
      // creates the movie div that goes into showcase div
      var movieDiv = constructMovieDiv(dataForCategory);
      // adds the movie div to html
      showcaseDiv.appendChild(movieDiv);
    }
    // adding the card to the parent html (nylegm, skemmtim kennslum)
    htmlCategory.appendChild(header);
    htmlCategory.appendChild(showcaseDiv);
  }

  function fetchData() {
    var request = new XMLHttpRequest();
    request.open('GET', 'videos.json', true);

    // runs a fuction to add the data to the html when request has retuned data
    request.onload = function () {
      // converts the response to a json object to be able to use it
      var dataFromJsonVideos = JSON.parse(request.response);

      // creates a variable with data from the categories
      var ny = dataFromJsonVideos.categories[0];
      empty(nylegm);
      displayData(dataFromJsonVideos, nylegm, ny);

      var kenns = dataFromJsonVideos.categories[1];
      empty(kennslum);
      displayData(dataFromJsonVideos, kennslum, kenns);

      var skem = dataFromJsonVideos.categories[2];
      empty(skemmtim);
      displayData(dataFromJsonVideos, skemmtim, skem);

      // displayData(dataFromJsonVideos)
    };
    request.send();
  }

  function init() {
    // searches the html document for html tags
    nylegm = document.querySelector('.nylegm');
    kennslum = document.querySelector('.kennslum');
    skemmtim = document.querySelector('.skemmtim');

    // fetches data from json files and constructs the html
    fetchData();
  }

  return {
    init: init
  };
}();

document.addEventListener('DOMContentLoaded', function () {
  // runs when the DOM content has loaded

  var playerHtml = document.querySelector('.spilandim');

  if (playerHtml) {
    player.init();
  } else {
    library.init();
  }
});

//# sourceMappingURL=script-compiled.js.map