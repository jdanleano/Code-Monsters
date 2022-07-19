function getLoggedInUserFromLocalStorage(){
  const loggedInUser = localStorage.getItem("ess-loggedin-user");
  return loggedInUser ? JSON.parse(loggedInUser) : null;
}

function setLoggedInUserFromLocalStorage(user){
  localStorage.setItem("ess-loggedin-user", JSON.stringify(user));
}

function removeLoggedInUserFromLocalStorage(){
  localStorage.removeItem("ess-loggedin-user");
}

function loginWithG() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider);
}

function signOut() {
  firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    loggedIn(user);
  } else {
    // User is signed out.
    loggedOut(user);
  }
});

function loggedIn(currentUser) {
    console.log(currentUser)
    setLoggedInUserFromLocalStorage(currentUser);
    showAuthButtons(false);
    renderUserInfo(currentUser.displayName, currentUser.photoURL)
}

function loggedOut(user) {
    removeLoggedInUserFromLocalStorage();
    showAuthButtons(true);
}

function renderUserInfo(displayName, photoURL) {
    const loggedUserLink = document.getElementById("logged-user-name");
    loggedUserLink.children[0].src = !photoURL ? "./assets/images/empty-profile-picture.png" : photoURL;
    loggedUserLink.children[1].textContent = displayName;
    btnLoginCloseModal.click(); // close the login modal
    document.getElementById("logged-user-image-comment").src = !photoURL ? "./assets/images/empty-profile-picture.png" : photoURL;
}

function showAuthButtons(show) {
    const authButtons = document.getElementById("auth-buttons");
    const logoutButtons = document.getElementById("logged-user-dropdown");
    authButtons.style.display = show ? "block" : "none";
    logoutButtons.style.display = !show ? "flex" : "none";
}

// event handler

const htmlEl = document.getElementsByTagName('html')[0];

const btnShowSignupModal = document.getElementById("btn-show-signup-modal")
btnShowSignupModal.onclick = function (e) {
    const target = btnShowSignupModal.dataset.target;
    htmlEl.classList.add("is-clipped");
    document.getElementById(target).classList.add("is-active");
  }

const btnSignupCloseModal = document.getElementById("signup-modal-close")
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

const btnLoginCloseModal = document.getElementById("login-modal-close")
btnLoginCloseModal.onclick = function (e) {
  htmlEl.classList.remove("is-clipped");
  btnLoginCloseModal.parentElement.classList.remove("is-active")
}

const formLogin = document.getElementById("form-login-modal");
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    const data = JSON.stringify(Object.fromEntries(formData));
    console.log(data);
})

const authLogoutLink = document.getElementById("auth-logout-link");
authLogoutLink.addEventListener("click", signOut);

const authGoogleButton = document.getElementById("auth-google-button");
authGoogleButton.addEventListener("click", loginWithG);

const authFacebookButton = document.getElementById("auth-facebook-button");
authFacebookButton.addEventListener("click", () => console.error("Current not available!"));

const authTwitterButton = document.getElementById("auth-twitter-button");
authTwitterButton.addEventListener("click", () => console.error("Current not available!"));

const authGithubButton = document.getElementById("auth-github-button");
authGithubButton.addEventListener("click", () => console.error("Current not available!"));
