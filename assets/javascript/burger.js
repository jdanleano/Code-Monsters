//Variables
var myBurgerButton = document.querySelector("#burger-button");
var myNavbar = document.querySelector("#navbarBasicExample");

//Shows/Hides Navbar on mobile
function toggleNavbar() {
    myNavbar.classList.toggle("is-active");
  }
  
  //Event listener for Burger Button
  myBurgerButton.addEventListener("click", toggleNavbar)