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
var ytArray = [];
var vimeoArray = [];

//Create Bulma Card
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


// Access Youtube API for User searches
function callYoutubeAPI(query) {
  fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=" + query + "&type=video&key=AIzaSyD_n80sbavNRpov43FkgTXB03jUflS96wA")
    .then((result) => {
      return result.json();
    }).then((data) => {
      console.log(data)
      for (var i = 0; i < 5; i++) {
        var ytObject = createResultObject(data.items[i].snippet.thumbnails.high.url, data.items[i].snippet.title, ("https://www.youtube.com/watch?v=" + data.items[i].id.videoId), false, ("https://www.youtube.com/embed/" + data.items[i].id.videoId), myYoutubeCont)
        addToArray(false, ytObject)
        ytObject.cont.appendChild(createCard(ytObject.img, ytObject.name, "yt", i))
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
        // Write a function to validate images and if they are undefined substitute another image (also find placeholder) - Alvin
        // Sometimes the embed link returns undefined, look into vimeo api and see if there is a filter in case some videos don't allow embedding.
        var vimeoObject = createResultObject(data.data[i].pictures.sizes[1].link, data.data[i].name, data.data[i].link, true, data.data[i].embed.html, myVimeoCont)
        addToArray(true, vimeoObject)
        vimeoObject.cont.appendChild(createCard(vimeoObject.img, vimeoObject.name, "vimeo", i))
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
  clearAllSearchRelated();
  var myQuery = myInput.value;
  var myFormattedQuery = formatQuery(myQuery);
  callVimeoAPI(myFormattedQuery);
  callYoutubeAPI(myFormattedQuery);
}


// Clear Embed container
function clearEmbedContainer(){
  if(myEmbedContainer.children.length > 0){
    myEmbedContainer.removeChild(myEmbedContainer.children[0]);
  }
}


// Clear Arrays, Embed and Search Containers
function clearAllSearchRelated(){
  for(var i = 0; i < 5; i++){
    console.log(myYoutubeCont.children.length)
    if(myYoutubeCont.children.length > 0){
      myYoutubeCont.removeChild(myYoutubeCont.firstChild);
      console.log(myYoutubeCont.children.length)
    }
    if(myVimeoCont.children.length > 0){
      myVimeoCont.removeChild(myVimeoCont.firstChild);
    }
  }
  ytArray.length = 0;
  vimeoArray.length = 0;
  clearEmbedContainer();
}


// Function getEmbedVideo(): finds passed in video and adds it to myEmbedContainer 
function getEmbedVideo(video) {
  var videoId = video.split(":");
  var myFoundVideo;
  var myEmbed = document.createElement("iframe");
  myEmbed.classList.add("has-ratio");
  myEmbed.setAttribute("width", "1920");
  myEmbed.setAttribute("height", "720");

  if (videoId[0] === "vimeo") {
    myFoundVideo = vimeoArray[videoId[1]].embed;
    console.log(myFoundVideo)
    myEmbed.setAttribute("src", vimeoEmbed(myFoundVideo));
  } else {
    myFoundVideo = ytArray[videoId[1]];
    myEmbed.setAttribute("src", ytArray[videoId[1]].embed);
  }

  myEmbedContainer.appendChild(myEmbed);
}


// Add Event Delegate for video results
myResultsContainer.onclick = function (event) {
  var videoResult = event.target;

  if (videoResult.classList.contains("video-block")) {
    clearEmbedContainer();
    getEmbedVideo(videoResult.closest(".div-parent").id);
  }
}
// Implement Firebase API to allow users to chat and potentially handling log in for site


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