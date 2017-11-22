'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // runs when the DOM content has loaded

  // initializes the program object where all the logic happens

  program.init();
});

var program = function () {

  var nylegar_myndir;

  function init() {
    // searches the whole document for nylegum html tag
    nylegar_myndir = document.querySelector('.showcase__nylegm');

    /*
        // uncomment to have js fill in the nylegar myndir
    
        empty(nylegar_myndir);
    
        addTrailer('videos/small.png','small info message','small title message');
        addTrailer('videos/small.png','small info message','small title message');
    */
  }

  function addTrailer(img_path, info_text, title_text) {
    // Make a new image html tag

    var movie_div = document.createElement('div');
    movie_div.classList.add('movie');

    var movie_img_div = document.createElement('div');
    movie_img_div.classList.add('movie__image');

    var movie_info_div = document.createElement('div');
    movie_info_div.classList.add('movie__info');

    var img_tag = document.createElement('img');
    // Adding a new attribute to link the actual image
    img_tag.setAttribute('src', img_path);
    // adding the css class for the movie image
    img_tag.classList.add('movie');

    var movie_title_text = document.createElement("p");
    movie_title_text.classList.add('title');
    movie_title_text.appendChild(document.createTextNode(title_text));

    var movie_info_text = document.createElement("p");
    movie_info_text.classList.add('info');
    movie_info_text.appendChild(document.createTextNode(info_text));

    movie_img_div.appendChild(img_tag);
    movie_div.appendChild(movie_img_div);

    movie_info_div.appendChild(movie_title_text);
    movie_info_div.appendChild(movie_info_text);
    movie_div.appendChild(movie_info_div);

    // adding the card to the parent html
    nylegar_myndir.appendChild(movie_div);
  }

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