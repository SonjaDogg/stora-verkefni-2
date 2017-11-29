STÓRT VERKEFNI 2
GENERAL INFORMATION

The exercise consists on a web with two pages and with the principles of responsive web design in mind. To view the exercise it is only necessary to open in browser the file index.html that is contained in the folder of the project: stort-verkefni-2.

GENERAL ORGANISATION OF THE PROJECT

The exercise has two html files, one for each page. These are:

    index.html - front page of the project with clickable videos
    videos.html - page to play the video that was chosen on the front page

Both html files refer to the css file:

    styles.css

To construct the css files several scss files have been used. The reason for this is to have a much cleaner and more structured organisation of the css in project. All the scss files are written using SASS and translated using node-sass tool from the package manager npm. The scss files in the project are:

    styles.scss - contains all the styles for the project
    breaks.scss - styles for the line that separates frontpage
    cards.scss - styles for the cards on index.html
    headings.scss - styles for the headings on both pages
    images.scss - styles for images
    menuback.scss - styles for the back feature on videos.html
    overlay.scss - styles for the overlay on both pages
    showcase.scss - styles for the containers for the images/videos on index.html

AUTHORS

Sonja Dögg Halldórsdóttir: sdh21@hi.is Unnur Bjarnadóttir: uab1@hi.is Daniel Crespo Munoz: dcm2@hi.is
