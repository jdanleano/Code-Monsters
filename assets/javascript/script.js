// Access Youtube API to submit searches for content we want to show (ex. Javascript videos with a certain rating)
// Added sample fetch request for Youtube videos with search "javascript tutorials english". API key is also valid, so we can keep using the API key at the end.
// fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=javascript%20tutorial%20english&key=AIzaSyD_n80sbavNRpov43FkgTXB03jUflS96wA")
// .then((result)=>{
//   console.log (result.json())
// }).then((data)=>{
//   console.log(data)
//   var videos = data.items
//   for(video of videos) {
//     document.write(video.snippet.title)
//   }
// })

var searchButton = document.querySelector("#search-button")
var myInput = document.querySelector("#search-input");
var myYoutubeCont = document.querySelector("#youtube-results");
var myVimeoCont = document.querySelector("#vimeo-results");
var myResultsContainer = document.querySelector("#video-event-delegate");
var myEmbedContainer = document.querySelector("#embed-container");
var myNavbar = document.querySelector("#navbarBasicExample")
var myBurgerButton = document.querySelector("#burger-button")

//Create Bulma Card
function createCard(imageURL, title) {
  var myCard = document.createElement("div");
  myCard.classList.add("card");

  var myCardImage = document.createElement("div");
  myCardImage.classList.add("card-image");
  myCard.appendChild(myCardImage);
  var myFigure = document.createElement("figure");
  myFigure.classList.add("image", "is-4by3");
  myCardImage.appendChild(myFigure);
  var myVideoImage = document.createElement("img");
  myVideoImage.setAttribute("src", imageURL);
  myVideoImage.setAttribute("alt", title);
  myFigure.appendChild(myVideoImage);

  var cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  myCard.appendChild(cardContent);
  var mediaContent = document.createElement("div")
  mediaContent.classList.add("media-content")
  cardContent.appendChild(mediaContent)
  var titleFour = document.createElement("p")
  titleFour.classList.add("title", "is-4")
  titleFour.textContent = title
  mediaContent.appendChild(titleFour)

  return myCard
}

// Format Embed for vimeo
function vimeoEmbed(str) {
  var myFirstSplit = str.split('src="');
  var mySecondSplit = myFirstSplit[1].split('"></iframe>');
  console.log(mySecondSplit[0]);
  return mySecondSplit[0];
}

// Takes in an image, name, description, link and HTML container to store results from API calls
function populateData(image, name, link, vimeo, embed, cont) {
  var myTitleImage = document.createElement("img");
  myTitleImage.classList.add("img-size");
  var nameElement = document.createElement("h2");
  var myLink = document.createElement("a");
  var myEmbed = document.createElement("iframe");
  var myContainer = document.createElement("div");
  myContainer.classList.add("video-block", "is-mobile", "is-tablet");

  myTitleImage.setAttribute("src", image);
  nameElement.textContent = name;
  myLink.setAttribute("href", link);
  myLink.textContent = "Watch";
  if (vimeo) {
    myEmbed.setAttribute("src", vimeoEmbed(embed));
  } else {
    myEmbed.setAttribute("src", embed);
  }


  myContainer.appendChild(myTitleImage);
  myContainer.appendChild(nameElement);
  myContainer.appendChild(myLink);
  myEmbedContainer.appendChild(myEmbed);
  cont.classList.add("is-mobile")
  cont.appendChild(myContainer);
}


// Access Youtube API for User searches
function callYoutubeAPI(query) {
  fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=" + query + "&type=video&key=AIzaSyD_n80sbavNRpov43FkgTXB03jUflS96wA")
    .then((result) => {
      return result.json();
    }).then((data) => {
      console.log(data)
      for (var i = 0; i < 5; i++) {
        populateData(data.items[i].snippet.thumbnails.high.url, data.items[i].snippet.title, ("https://www.youtube.com/watch?v=" + data.items[i].id.videoId), false, ("https://www.youtube.com/embed/" + data.items[i].id.videoId), myYoutubeCont)
      }
    })
}


// calls the Vimeo API and adds relevant data to the site
function callVimeoAPI(query) {
  fetch("https://api.vimeo.com/videos?query=" + query + "&total=10&page=1&per_page=5&access_token=0ff146aa1ed83ea925ee9c0cd2b088bb", {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < 5; i++) {
        // populateData(data.data[i].pictures.sizes[1].link, data.data[i].name, data.data[i].link, true, data.data[i].embed.html, myVimeoCont)
      }
    })
}

// format myInput for apis
function formatQuery(query) {
  var mySpecCharsArray = [
    { a: '!', b: '%21' },
    { a: '"', b: '%22' },
    { a: '#', b: '%23' },
    { a: '$', b: '%24' },
    { a: ' ', b: '%20' },
    { a: '&', b: '%26' },
    { a: '‘', b: '%27' },
    { a: '*', b: '%2A' },
    { a: '+', b: '%2B' },
    { a: ',', b: '%2C' },
    { a: '/', b: '%2F' },
    { a: '=', b: '%3D' },
    { a: '?', b: '%3F' },
  ]
  var tempString;
  var str;
  str = query.replaceAll('%', '%25');
  tempString = str;

  for (var i = 0; i < mySpecCharsArray.length; i++) {
    str = tempString.replaceAll(mySpecCharsArray[i].a, mySpecCharsArray[i].b);
    tempString = str;
  }
  return tempString;
}


// findVideos calls both youtube and vimeo apis while converting the input to something both apis can use.
function findVideos() {
  var myQuery = myInput.value;
  var myFormattedQuery = formatQuery(myQuery);
  callVimeoAPI(myFormattedQuery);
  callYoutubeAPI(myFormattedQuery);
}

// Add Event Delegate for video results
myResultsContainer.onclick = function (event) {
  var videoResult = event.target;

  if (videoResult.classList.contains("video-block")) {
    console.log("it's working!!!!");
  }
}
// Implement Firebase API to allow users to chat and potentially handling log in for site


// Declare any necessary variables


// Add Event Delegates or listeners for the for each section of videos


// Local Storage for Favorites, Recently Viewed, Notes,
//Store four recent videos in local storage
//Check whether local storage exists or not 
function isLocalStorage() {
  if (localStorage.getItem("recentlyViewed") !== null) {
    return true;
  } else {
    return false;
  }
}

// MODAL JS for SIGN UP and LOG IN


let htmlEl = document.getElementsByTagName('html')[0];
const btnShowSignupModal = document.getElementById("btn-show-signup-modal")
let btnSignupCloseModal = document.getElementById("signup-modal-close")
let btnLoginCloseModal = document.getElementById("login-modal-close")

btnShowSignupModal.onclick = function (e) {
  const target = btnShowSignupModal.dataset.target;
  htmlEl.classList.add("is-clipped");
  document.getElementById(target).classList.add("is-active");
}

btnSignupCloseModal.onclick = function (e) {
  htmlEl.classList.remove("is-clipped");
  btnSignupCloseModal.parentElement.classList.remove("is-active")
}

const btnShowLoginModal = document.getElementById("btn-show-login-modal")

btnShowLoginModal.onclick = function (e) {
  const target = btnShowLoginModal.dataset.target;
  htmlEl.classList.add("is-clipped");
  document.getElementById(target).classList.add("is-active");
}

btnLoginCloseModal.onclick = function (e) {
  htmlEl.classList.remove("is-clipped");
  btnLoginCloseModal.parentElement.classList.remove("is-active")
}

// Allows the user to press ENTER after typing their search query to execute the search.
myInput.addEventListener("keypress", function (event) {

  if (event.key === "Enter") {
    event.preventDefault();
    findVideos();
  }
})

// Eventlistener for search button
searchButton.addEventListener("click", findVideos)

//Shows/Hides Navbar on mobile
function toggleNavbar() {
  myNavbar.classList.toggle("is-active");
}

//Event listener for Burger Button
myBurgerButton.addEventListener("click", toggleNavbar)