// Variables
var searchButton = document.querySelector("#search-button");
var myInput = document.querySelector("#search-input");
var myYoutubeCont = document.querySelector("#youtube-results");
var myVimeoCont = document.querySelector("#vimeo-results");
var myResultsContainer = document.querySelector("#video-event-delegate");
var myEmbedContainer = document.querySelector("#embed-container");
var myNavbar = document.querySelector("#navbarBasicExample");
var myBurgerButton = document.querySelector("#burger-button");
var ytArray = [];
var vimeoArray = [];
var myRecentlyViewedArray = [];
var myRecentlyViewed = document.querySelector("#recent-viewed");
var myNowPlayingContainer = document.querySelector("#now-playing");
var myRecentlyViewedContainer = document.querySelector("#recently-viewed-container");
var myYTLoader = document.querySelector("#yt-loader");
var myVLoader = document.querySelector("#v-loader");


// Create Bulma Card
function createCard(imageURL, title, source, index) {
  var myCard = document.createElement("div");
  myCard.classList.add("card", "div-parent", "is-align-items-center");
  myCard.setAttribute("id", source + ":" + index)

  var myCardImage = document.createElement("div");
  myCardImage.classList.add("card-image");
  myCard.appendChild(myCardImage);
  var myFigure = document.createElement("figure");
  myFigure.classList.add("image", "has-ratio");
  myCardImage.appendChild(myFigure);
  var myVideoImage = document.createElement("img");
  myVideoImage.setAttribute("src", imageURL);
  myVideoImage.setAttribute("alt", title);
  myVideoImage.classList.add("video-block", "is-flex", "img-card")
  myFigure.appendChild(myVideoImage);

  var cardContent = document.createElement("div");
  cardContent.classList.add("card-content", "video-block");
  myCard.appendChild(cardContent);
  var mediaContent = document.createElement("div")
  mediaContent.classList.add("media-content")
  cardContent.appendChild(mediaContent)
  var titleFour = document.createElement("p")
  titleFour.classList.add("title", "is-6", "video-block")
  titleFour.textContent = title
  mediaContent.appendChild(titleFour)

  return myCard
}


// Format Embed for vimeo
function vimeoEmbed(str) {
  var myFirstSplit = str.split('src="');
  var mySecondSplit = myFirstSplit[1].split('"></iframe>');
  return mySecondSplit[0];
}


// Store API data
function addToArray(vimeo, object) {
  if (vimeo) {
    vimeoArray.push(object)
  } else {
    ytArray.push(object)
  }

}


// Create result object
function createResultObject(image, name, link, vimeo, embed, cont) {
  var myObject = {
    img: image,
    name: name,
    link: link,
    vimeo: vimeo,
    embed: embed,
    cont: cont
  }
  return myObject;
}


// Show NowPlaying and RecentlyViewed Containers
function showNowPlayingAndRecentlyViewed() {
  myNowPlayingContainer.classList.remove("is-hidden");
  myRecentlyViewedContainer.classList.remove("is-hidden");
}


// Show/Hide Loader
function showOrHideLoader(id) {
  switch (id) {
    case 'yt':
      myYTLoader.classList.toggle("is-active");
      break;
    case 'v':
      myVLoader.classList.toggle("is-active");
      break;
    default: console.log("Something went wrong!");
  }
}


// Access Youtube API for User searches
function callYoutubeAPI(query) {
  fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=" + query + "&type=video&key=AIzaSyD_n80sbavNRpov43FkgTXB03jUflS96wA")
    .then((result) => {
      return result.json();
    }).then((data) => {
      // console.log(data)
      for (var i = 0; i < data.items.length; i++) {
        var ytObject = createResultObject(data.items[i].snippet.thumbnails.high.url, data.items[i].snippet.title, ("https://www.youtube.com/watch?v=" + data.items[i].id.videoId), false, ("https://www.youtube.com/embed/" + data.items[i].id.videoId), myYoutubeCont)
        addToArray(false, ytObject)
        ytObject.cont.appendChild(createCard(ytObject.img, ytObject.name, "yt", i))
      }
      showOrHideLoader("yt");
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
      // console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        // Sometimes the embed link returns undefined, look into vimeo api and see if there is a filter in case some videos don't allow embedding.
        var vimeoObject = createResultObject(data.data[i].pictures.sizes[1].link, data.data[i].name, data.data[i].link, true, data.data[i].embed.html, myVimeoCont)
        addToArray(true, vimeoObject)
        vimeoObject.cont.appendChild(createCard(vimeoObject.img, vimeoObject.name, "vimeo", i))
      }
      showOrHideLoader("v");
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
  clearAllSearchRelated();
  var myQuery = myInput.value;
  var myFormattedQuery = formatQuery(myQuery);
  showOrHideLoader("v");
  callVimeoAPI(myFormattedQuery);
  showOrHideLoader("yt");
  callYoutubeAPI(myFormattedQuery);
  showNowPlayingAndRecentlyViewed();
}


// Clear Embed container
function clearEmbedContainer() {
  if (myEmbedContainer.children.length > 0) {
    myEmbedContainer.removeChild(myEmbedContainer.children[0]);
  }
}


// Clear Arrays, Embed and Search Containers
function clearAllSearchRelated() {
  for (var i = 0; i < 5; i++) {
    if (myYoutubeCont.children.length > 0) {
      myYoutubeCont.removeChild(myYoutubeCont.firstChild);
    }
    if (myVimeoCont.children.length > 0) {
      myVimeoCont.removeChild(myVimeoCont.firstChild);
    }
  }
  ytArray.length = 0;
  vimeoArray.length = 0;
  clearEmbedContainer();
}

// Clear recently added videos
function clearRecentlyAdded() {
  for (var i = 0; i < 5; i++) {
    if (myRecentlyViewed.children.length > 0) {
      myRecentlyViewed.removeChild(myRecentlyViewed.firstChild);
    }
  }
}


//Check whether local storage exists or not 
function isLocalStorage() {
  if (localStorage.getItem("recentlyViewed") !== null) {
    return true;
  } else {
    return false;
  }
}


// Add recently viewed video to recently viewed HTML container
function addVideo(video, index) {
  var myRecent = createCard(video.img, video.name, video.vimeo, index) //Get index from other function
  myRecentlyViewed.appendChild(myRecent)
}


// returns true if there is a copy of the same video in local storage 
function checkForDuplicates(currentVideo, storageArray) {
  for (var i = 0; i < storageArray.length; i++) {
    if (currentVideo.link === storageArray[i].link) {
      return true;
    }
  }
  return false;
}


// Get recently viewed videos
function getRecentlyViewedVideosArray() {
  if (isLocalStorage) {
    var myArray = JSON.parse(localStorage.getItem("recentlyViewed"));
  }
  return myArray;
}


// Add to recently viewed
function recentlyViewed(video) {
  var tempViewedArray = [];
  if (isLocalStorage()) { // if localstorage exists,then store it in the existingStorage variable
    var existingStorage = JSON.parse(localStorage.getItem("recentlyViewed"))

    if (checkForDuplicates(video, existingStorage)) { // if existingStorage already has the same video in it, just clear the recently viewed container and add whatever is in existingStorage to the recently viewed container 
      clearRecentlyAdded();
      for (var i = 0; i < existingStorage.length; i++) {
        addVideo(existingStorage[i], i);
      }
      if (tempViewedArray.length > 4) { // if the tempViewedArray is greater than 4 then remove the first video
        tempViewedArray.pop();
      }
      return;
    }
    // Otherwise, add all of the existing videos to the tempViewedArray and then add the newest video in front.
    for (var i = 0; i < existingStorage.length; i++) {
      tempViewedArray.push(existingStorage[i]);
    }

    tempViewedArray.unshift(video);

    if (tempViewedArray.length > 4) { // if the tempViewedArray is greater than 4 then remove the first video
      tempViewedArray.pop();
      console.log("removed video: " + tempViewedArray.length);
    }

    clearRecentlyAdded();
    localStorage.setItem("recentlyViewed", JSON.stringify(tempViewedArray))
    for (var i = 0; i < tempViewedArray.length; i++) {
      addVideo(tempViewedArray[i], i);
    }
  }
  else {
    tempViewedArray.push(video)
    localStorage.setItem("recentlyViewed", JSON.stringify(tempViewedArray))
    addVideo(video, 0)
  }
}


// Embed recent video
function embedRecentVideo(recentVideo) {
  var videoId = recentVideo.split(":");
  var myFoundVideo;
  var recentEmbed = document.createElement("iframe");
  recentEmbed.classList.add("has-ratio");

  if (videoId[0] === "true") {
    var myVimeoEmbed = getRecentlyViewedVideosArray()[videoId[1]].embed;
    myFoundVideo = getRecentlyViewedVideosArray()[videoId[1]];
    recentEmbed.setAttribute("src", vimeoEmbed(myVimeoEmbed));
  } else {
    myFoundVideo = getRecentlyViewedVideosArray()[videoId[1]];
    recentEmbed.setAttribute("src", myFoundVideo.embed)
  }
  myEmbedContainer.appendChild(recentEmbed);
}


// Add Event Delegate for recently viewed videos
myRecentlyViewed.onclick = function (event) {
  var selectedVideo = event.target;

  if (selectedVideo.classList.contains("video-block")) {
    clearEmbedContainer();
    embedRecentVideo(selectedVideo.closest(".div-parent").id)
    myNowPlayingContainer.scrollIntoView();
  }
}


// Function getEmbedVideo(): finds passed in video and adds it to myEmbedContainer 
function getEmbedVideo(video) {
  var videoId = video.split(":");
  var myFoundVideo;
  var myEmbed = document.createElement("iframe");
  myEmbed.classList.add("has-ratio");

  if (videoId[0] === "vimeo") {
    var myVimeoEmbed = vimeoArray[videoId[1]].embed;
    myFoundVideo = vimeoArray[videoId[1]];
    myEmbed.setAttribute("src", vimeoEmbed(myVimeoEmbed));
  } else {
    myFoundVideo = ytArray[videoId[1]];
    myEmbed.setAttribute("src", myFoundVideo.embed);
  }
  console.log(myFoundVideo.link)
  myEmbed.setAttribute("data-link", myFoundVideo.link);
  myEmbedContainer.appendChild(myEmbed);
  recentlyViewed(myFoundVideo)
  getCommentsByVideoLink(myFoundVideo, true)
}


// Add Event Delegate for video results
myResultsContainer.onclick = function (event) {
  var videoResult = event.target;

  if (videoResult.classList.contains("video-block")) {
    clearEmbedContainer();
    getEmbedVideo(videoResult.closest(".div-parent").id);
    myNowPlayingContainer.scrollIntoView();
  }
}


// Allows the user to press ENTER after typing their search query to execute the search.
myInput.addEventListener("keypress", function (event) {

  if (event.key === "Enter") {
    event.preventDefault();
    findVideos();
  }
})


// Check if there are RecentlyViewed videos in localstorage, if there are, load them
if (isLocalStorage()) {
  var myVideoArray = getRecentlyViewedVideosArray();
  for (var i = 0; i < myVideoArray.length; i++) {
    addVideo(myVideoArray[i], i);
  }
}


// Eventlistener for search button
searchButton.addEventListener("click", findVideos)


//Shows/Hides Navbar on mobile
function toggleNavbar() {
  myNavbar.classList.toggle("is-active");
}


//Event listener for Burger Button
myBurgerButton.addEventListener("click", toggleNavbar)