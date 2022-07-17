const firebaseConfig = {
    apiKey: "AIzaSyCed6bHJuomOPElpid5bKFaCtUUGXV2q_E",
    authDomain: "project-7ca3f.firebaseapp.com",
    databaseURL: "https://project-7ca3f.firebaseio.com",
    projectId: "project-7ca3f",
    storageBucket: "project-7ca3f.appspot.com",
    messagingSenderId: "105261573697",
    appId: "1:105261573697:web:63c7ba559e15517613c8c0",
    measurementId: "G-4EF1DDM1M4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore();
let currentUser;

function loginWithG() {
  console.log("Sign in with G");
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider);
}

function signOut() {
  console.log("Signing Out");
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

function loggedIn(user) {
    currentUser = user;
    showAuthButtons(false);
    renderUserInfo(currentUser.displayName, currentUser.photoURL)
    console.log(currentUser)
    console.log(currentUser.email);
}

function loggedOut(user) {
    currentUser = "";
    showAuthButtons(true);
    console.log(currentUser.email);
}

function renderUserInfo(displayName, photoURL) {
    const loggedUserLink = document.getElementById("logged-user-name");
    loggedUserLink.children[0].src = !photoURL ? "./assets/images/empty-profile-picture.png" : photoURL;
    loggedUserLink.children[1].textContent = displayName;
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
