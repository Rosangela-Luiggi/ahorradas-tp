const $ = (elemento) => document.querySelector(elemento);

window.addEventListener("load", function () {

    /*  VARIABLES*/
    //menu desplegable
const $btnNavBar = $(".navbar-burger");
const $navEnd = $(".navbar-menu");

//botones del nav
const btnBalance = $("#btn-balance");
const btnCategory = $("#btn-category");
const btnReports = $("#btn-report");

// contenedores de secciones
const $containerBalance = $("#balance-cont");
const $containerCategory = $("#category-cont");
const $containerReports = $("#reports-cont");

// boton para ocultar filtros
const $btnFilter = $("#btn-filter");
const $containerFilter = $(".filter");

//mostrar y cerrar nueva operacion
const $btnNewOp = $("#new-operation");
const $newOperacion = $("#operation-cont");
const $btnCancelOp = $("#close");

/* FUNCIONES */
//activar el menu burgur
const activeNacBar = () =>{
    $navEnd.classList.toggle("is-active");
    $btnNavBar.classList.toggle("is-active");
}



/* EVENTOS */
// evento menu burgur 
$btnNavBar.addEventListener("click", activeNacBar);


 
  /* let ocultar =(container)=>{
    let $hiddeViews = document.querySelectorAll(".section");
 $hiddeViews.classList.add("is-hidden");
 container.classList.remove("is-hidden");
 container.classList.add("is-active");

  }
  btnBalance.addEventListener("click", ocultar($containerBalance));
  btnCategory.addEventListener("click", ocultar($containerCategory ));
  btnReports.addEventListener("click", ocultar($containerReports)); */

  //cambio de vistas
  btnBalance.addEventListener("click", () =>  {
    $containerBalance.classList.remove("is-hidden");
    $containerCategory.classList.add("is-hidden");
    $containerReports.classList.add("is-hidden");
  });

  btnCategory.addEventListener("click", () =>  {
    $containerCategory.classList.remove("is-hidden");
    $containerBalance.classList.add("is-hidden");
    $containerReports.classList.add("is-hidden");
  });

  btnReports.addEventListener("click", () =>  {
    $containerReports.classList.remove("is-hidden");
    $containerCategory.classList.add("is-hidden");
    $containerBalance.classList.add("is-hidden");
    
  });
  //ocultar filtro

  $btnFilter.addEventListener("click", () =>  {
    $containerFilter.classList.toggle("is-hidden");
  });

//mostrar y cerrar nueva operacion
  $btnNewOp.addEventListener("click", () =>  {
    $containerBalance.classList.add("is-hidden");
    $newOperacion.classList.remove("is-hidden");
  });

  $btnCancelOp.addEventListener("click", () =>  {
    $newOperacion.classList.add("is-hidden");
    $containerBalance.classList.remove("is-hidden");
  });



















});
 