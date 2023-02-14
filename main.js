const $ = (elemento) => document.querySelector(elemento);

window.addEventListener("load", function () {
    /* menu desplegable */
const $btnNavBar = $(".navbar-burger");
const $navEnd = $(".navbar-menu");

const activeNacBar = () =>{
    $navEnd.classList.toggle("is-active");
    $btnNavBar.classList.toggle("is-active");
}
$btnNavBar.addEventListener("click", activeNacBar);


 $hideViews = document.querySelectorAll(".section")















});
 