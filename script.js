
const player = (function () {
  let videoContainer;
  let videoIndex;

  let video;
  let backHtml;
  let playHtml;
  let muteHtml;
  let fullscreenHtml;
  let forwardHtml;

  // clears elements already present in html
  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  // finds the video in json by index number
  function getVideoAtIndex(index, videoArray) {
    let videoData;
    let i;
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
    const spilandimHtml = document.createElement('div');
    const header = document.createElement('h1');
    const screenHtml = document.createElement('div');
    const overlayDiv = document.createElement('div');
    const imgTag = document.createElement('img');
    const videoTag = document.createElement('video');

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
    const request = new XMLHttpRequest();
    request.open('GET', 'videos.json', true);

    request.onload = function () {
      // converts the response to a json object to be able to use it
      const dataFromJsonVideos = JSON.parse(request.response);
      const videos = dataFromJsonVideos.videos;
      const data = getVideoAtIndex(videoIndex, videos);
      constructVideoPlayer(data);

      bindControls();
    };
    request.send();
  }

  function init() {
    const url = window.location.search;
    videoIndex = url.split('=')[1];
    videoContainer = document.querySelector('.video_container');

    // Fetching video control elements

    empty(videoContainer);
    fetchData();
  }

  return {
    init: init,
  };
})();

const library = (function () {
  let nylegm;
  let kennslum;
  let skemmtim;

  // clears elements already present in html
  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  // finds the video in json by index number
  function getVideoAtIndex(index, videoArray) {
    for (let i = 0; i < videoArray.length; i += 1) {
      const videoData = videoArray[i];

      if (videoData.id === index) {
        return videoData;
      }
    }
    return 0;
  }

  function showTime(movieTime) {
    // Changes seconds to minutes and seconds
    const minutes = Math.floor(movieTime / 60);
    let seconds = movieTime - Math.floor(movieTime / 60) * 60;

    // Adds a '0' in front of seconds if only 1 digit
    if (seconds.toString().length === 1) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  function showDate(movieTime) {
    const d = new Date();
    const n = d.getTime();
    let timePassed = movieTime - 0;

    // Computing difference between current date and created date
    // and changing to years, months, weeks and days
    const days = Math.floor((n - timePassed) / 1000 / 86400);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 52);
    const years = Math.floor(days / 365.25);

    // Deciding what should be printed out below video
    if (years >= 1) {
      if (years === 1) timePassed = `Fyrir ${years} ári síðan`;
      else timePassed = `Fyrir ${years} árum síðan`;
    } else if (months >= 1) {
      if (months === 1) timePassed = `Fyrir ${months} mánuði síðan`;
      else timePassed = `Fyrir ${months} mánuðum síðan`;
    } else if (weeks >= 1) {
      if (weeks === 1) timePassed = `Fyrir ${weeks} viku síðan`;
      else timePassed = `Fyrir ${weeks} vikum síðan`;
    } else if (days >= 1) {
      if (days === 1) timePassed = `Fyrir ${days} degi síðan`;
      else timePassed = `Fyrir ${days} dögum síðan`;
    }
    return timePassed;
  }

  function constructMovieDiv(dataForVideo) {
    // making html structure
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const videoHtml = 'videos.html';
    const idForVid = '?id=';
    const clickableContainer = document.createElement('a');
    clickableContainer.setAttribute('href', videoHtml + idForVid + dataForVideo.id);
    const movieImgDiv = document.createElement('div');
    movieImgDiv.classList.add('movie__image');

    const movieInfoDiv = document.createElement('div');
    movieInfoDiv.classList.add('movie__info');

    const imgTag = document.createElement('img');

    // Adding a new attribute to link the actual image
    imgTag.setAttribute('src', dataForVideo.poster);

    // Overlay of the length of the video
    const tOverlay = document.createElement('div');
    tOverlay.classList.add('t_overlay');
    const pLength = document.createElement('p');
    pLength.appendChild(document.createTextNode(showTime(dataForVideo.duration)));
    tOverlay.appendChild(pLength);

    // adding the css class for the movie image
    const movieTitleText = document.createElement('p');
    movieTitleText.classList.add('title');
    movieTitleText.appendChild(document.createTextNode(dataForVideo.title));

    const movieInfoText = document.createElement('p');
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
    const videosInCategory = category.videos;
    const videos = data.videos;

    // creates the header and gives it the title
    const header = document.createElement('h1');
    header.appendChild(document.createTextNode(category.title));

    // creates showcase div element
    const showcaseDiv = document.createElement('div');
    showcaseDiv.classList.add('showcase');

    // iterates through all videos in category
    for (let i = 0; i < videosInCategory.length; i += 1) {
      const videoIndex = videosInCategory[i];

      // finds video data for the caregory at this index
      const dataForCategory = getVideoAtIndex(videoIndex, videos);
      // creates the movie div that goes into showcase div
      const movieDiv = constructMovieDiv(dataForCategory);
      // adds the movie div to html
      showcaseDiv.appendChild(movieDiv);
    }
    // adding the card to the parent html (nylegm, skemmtim kennslum)
    htmlCategory.appendChild(header);
    htmlCategory.appendChild(showcaseDiv);
  }

  function fetchData() {
    const request = new XMLHttpRequest();
    request.open('GET', 'videos.json', true);

    // runs a fuction to add the data to the html when request has retuned data
    request.onload = function () {
      // converts the response to a json object to be able to use it
      const dataFromJsonVideos = JSON.parse(request.response);

      // creates a variable with data from the categories
      const ny = dataFromJsonVideos.categories[0];
      empty(nylegm);
      displayData(dataFromJsonVideos, nylegm, ny);

      const kenns = dataFromJsonVideos.categories[1];
      empty(kennslum);
      displayData(dataFromJsonVideos, kennslum, kenns);

      const skem = dataFromJsonVideos.categories[2];
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
    init: init,
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  // runs when the DOM content has loaded

  const playerHtml = document.querySelector('.spilandim');

  if (playerHtml) {
    player.init();
  } else {
    library.init();
  }
});
