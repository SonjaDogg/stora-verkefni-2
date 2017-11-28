'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // runs when the DOM content has loaded

  var playerHtml = document.querySelector('.spilandim');

  if (playerHtml) {
    player.init();
  } else {
    library.init();
  }
});

var player = function () {
  var videoContainer = void 0;
  var videoIndex = void 0;

  var video = void 0;
  var overlayButtonHtml = void 0;
  var backHtml = void 0;
  var playHtml = void 0;
  var muteHtml = void 0;
  var fullscreenHtml = void 0;
  var forwardHtml = void 0;

  function init() {
    var url = window.location.search;
    videoIndex = url.split('=')[1];
    videoContainer = document.querySelector('.video_container');

    // Fetching video control elements

    empty(videoContainer);
    fetchData();
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
  }

  function bindControls() {
    video = document.querySelector('video');
    backHtml = document.getElementsByClassName('back');
    playHtml = document.getElementsByClassName('play');
    muteHtml = document.getElementsByClassName('mute');
    fullscreenHtml = document.getElementsByClassName('fullscreen');
    forwardHtml = document.getElementsByClassName('next');
    overlayButtonHtml = document.getElementsByClassName('overlay');

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

  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
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

  return {
    init: init
  };
}();

var library = function () {
  var nylegm = void 0;
  var kennslum = void 0;
  var skemmtim = void 0;

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

  function showDate(movieDate) {
    // calculates the difference of time between the creation of the video and
    // the current time when the script is run
    var diff = (Date.now() - movieDate) / 1000;

    var diffY = Math.floor(diff / (60 * 60 * 24 * 30 * 12));
    var diffM = Math.floor(diff / (60 * 60 * 24 * 30) % 12);
    var diffW = Math.floor(diff / (60 * 60 * 24 * 7) % 30);
    var diffD = Math.floor(diff / (60 * 60 * 24) % 7);
    var diffH = Math.floor(diff / (60 * 60) % 24);

    // selects the correct sentence to show
    switch (true) {
      case diffY !== 0 && diffY === 1:
        return 'Fyrir, ' + diffY + ' \xE1ri s\xED\xF0an';
        break;
      case diffY !== 0 && diffY !== 1:
        return 'Fyrir ' + diffY + ' \xE1rum s\xED\xF0an';
        break;
      case diffY === 0 && diffM === 1:
        return 'Fyrir  ' + diffM + ' m\xE1nu\xF0i s\xED\xF0an';
        break;
      case diffY === 0 && diffM !== 1 && diffM > 1:
        return 'Fyrir ' + diffM + ' m\xE1nu\xF0um s\xED\xF0an';
        break;
      case diffY === 0 && diffM === 0 && diffW === 1:
        return 'Fyrir ' + diffW + ' viku s\xED\xF0an';
        break;
      case diffY === 0 && diffM === 0 && diffW !== 1 && diffW > 1:
        return 'Fyrir ' + diffW + ' vikum s\xED\xF0an';
        break;
      case diffY === 0 && diffM === 0 && diffW === 0 && diffD === 1:
        return 'Fyrir ' + diffD + ' degi s\xED\xF0an';
        break;
      case diffY === 0 && diffM === 0 && diffW === 0 && diffD !== 1 && diffD > 1:
        return 'Fyrir ' + diffD + ' d\xF6gum s\xED\xF0an';
        break;
      case diffY === 0 && diffM === 0 && diffW === 0 && diffD === 0 && diffH === 1:
        return 'Fyrir ' + diffH + ' klukkustund s\xED\xF0an';
        break;
      default:
        return 'Fyrir ' + diffH + ' klukkustundum s\xED\xF0an';
    }
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