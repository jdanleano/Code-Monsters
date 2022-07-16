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

// Access Youtube API for User searches

function callVimeoAPI(){

  fetch("https://api.vimeo.com/videos?query=" + myQuery + "&page=1&perPage=10&access_token=0ff146aa1ed83ea925ee9c0cd2b088bb", {
  })
  .then(function(response){
      return response.json();
  })
  .then(function(data){
      console.log(data);
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