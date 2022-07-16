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

// Takes in an image, name, description, link and HTML container to store results from API calls
function populateData(image, name, desc, link, cont){
  var myTitleImage = document.createElement("img");
  var nameElement = document.createElement("h2");
  var descElement = document.createElement("p");
  var myLink = document.createElement("a");
  var myContainer = document.createElement("div");
  myContainer.classList.add("video-block");

  myTitleImage.setAttribute("src", image);
  nameElement.textContent = name;
  descElement.textContent = desc;
  myLink.setAttribute("href", link);
  myLink.textContent = "Watch";
  
  myContainer.appendChild(myTitleImage);
  myContainer.appendChild(nameElement);
  myContainer.appendChild(descElement);
  myContainer.appendChild(myLink);
  cont.appendChild(myContainer);
}

// Access Youtube API for User searches
// function callYoutubeAPI(){
  
// }


// calls the Vimeo API and adds relevant data to the site
function callVimeoAPI(){
  fetch("https://api.vimeo.com/videos?query=" + myQuery + "&page=1&perPage=10&access_token=0ff146aa1ed83ea925ee9c0cd2b088bb", {
  })
  .then(function(response){
      return response.json();
  })
  .then(function(data){
      console.log(data);
      for(var i = 0; i < 10; i++){
        populateData(data.data[i].pictures.sizes[1].link, data.data[i].name, data.data[i].description, data.data[i].link, myResults)       
      }
    })
  }

// Implement Firebase API to allow users to chat and potentially handling log in for site


// Declare any necessary variables


// Add Event Delegates or listeners for the for each section of videos


// Local Storage for Favorites, Recently Viewed, Notes, Chat History


// MODAL JS for SIGN UP and LOG IN


let htmlEl = document.getElementsByTagName('html')[0];
const btnShowSignupModal = document.getElementById("btn-show-signup-modal")
let btnSignupCloseModal = document.getElementById("signup-modal-close")
let btnLoginCloseModal = document.getElementById("login-modal-close")

btnShowSignupModal.onclick = function(e){
  const target = btnShowSignupModal.dataset.target;
  htmlEl.classList.add("is-clipped");
  document.getElementById(target).classList.add("is-active");
}

btnSignupCloseModal.onclick = function(e){
  htmlEl.classList.remove("is-clipped");
  btnSignupCloseModal.parentElement.classList.remove("is-active")
}

const btnShowLoginModal = document.getElementById("btn-show-login-modal")

btnShowLoginModal.onclick = function(e){
  const target = btnShowLoginModal.dataset.target;
  htmlEl.classList.add("is-clipped");
  document.getElementById(target).classList.add("is-active");
}

btnLoginCloseModal.onclick = function(e){
  htmlEl.classList.remove("is-clipped");
  btnLoginCloseModal.parentElement.classList.remove("is-active")
}