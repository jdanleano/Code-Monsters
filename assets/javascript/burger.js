//Find and store Hamburger Button element
var myBurgerButton = document.querySelector("#burger-button");

//Shows/Hides Navbar on mobile
function toggleNavbar() {
    myNavbar.classList.toggle("is-active");
  }
  
  //Event listener for Burger Button
  myBurgerButton.addEventListener("click", toggleNavbar)