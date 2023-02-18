const $ = (elemento) => document.querySelector(elemento);

let category = [];

window.addEventListener("load", function () {
  category = JSON.parse(localStorage.getItem("datosCtg"))
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

  //seccion de crear categoria
  const $inputcategory = $("#ipt-text-name");
  const $ctgNewcategory = $("#container-ctg");
  const $formNewcategory = $("#form-category");
  const $conEditCtg = $("#category-edit");
  const $inputEdit = $("#b");
  const $formEdit = $("#a");


  /* FUNCIONES */
  /* let $hiddeViews = document.querySelectorAll(".section");
   let ocultar =(container)=>{
      
      $hiddeViews.forEach((set) => {
     set.classList.add("is-hidden");
   container.classList.remove("is-hidden");
   container.classList.add("is-active");
      
    });
   
    }
    btnBalance.addEventListener("click", ocultar($containerBalance));
    btnCategory.addEventListener("click", ocultar($containerCategory ));
    btnReports.addEventListener("click", ocultar($containerReports)); */


  //activar el menu burgur
  const activeNacBar = () => {
    $navEnd.classList.toggle("is-active");
    $btnNavBar.classList.toggle("is-active");
  }

  //agrega una nueva categoria
  let agregarCategoria = () => {
    category.push({
      id: crypto.randomUUID(),
      titulo: $inputcategory.value
    });
    localStorage.setItem("datosCtg", JSON.stringify(category));
    return paintCategory();
  };
  console.log("chao")
  let editCategory = () => {
   
    category = category.map((item) => {
      if (item.id === category.id) {
        item.titulo = $inputEdit.value;
      }
      console.log($inputEdit.value)
      return $inputEdit.value;
      
    });
    localStorage.setItem("datosCtg", JSON.stringify(category));
  };



  /* EVENTOS */
  // evento menu burgur 
  $btnNavBar.addEventListener("click", activeNacBar);

  //cambio de vistas
  btnBalance.addEventListener("click", () => {
    $containerBalance.classList.remove("is-hidden");
    $containerCategory.classList.add("is-hidden");
    $containerReports.classList.add("is-hidden");
    $conEditCtg.classList.add("is-hidden");
  });

  btnCategory.addEventListener("click", () => {
    $containerCategory.classList.remove("is-hidden");
    $containerBalance.classList.add("is-hidden");
    $containerReports.classList.add("is-hidden");
    $conEditCtg.classList.add("is-hidden");
  });

  btnReports.addEventListener("click", () => {
    $containerReports.classList.remove("is-hidden");
    $containerCategory.classList.add("is-hidden");
    $containerBalance.classList.add("is-hidden");
    $conEditCtg.classList.add("is-hidden");

  });
  //ocultar filtro

  $btnFilter.addEventListener("click", () => {
    $containerFilter.classList.toggle("is-hidden");
  });

  //mostrar y cerrar nueva operacion
  $btnNewOp.addEventListener("click", () => {
    $containerBalance.classList.add("is-hidden");
    $newOperacion.classList.remove("is-hidden");
  });

  $btnCancelOp.addEventListener("click", () => {
    $newOperacion.classList.add("is-hidden");
    $containerBalance.classList.remove("is-hidden");
  });

  /* ---------------------- Aqui inicie categoria------------- */
  //crear nueva categoria
  $formNewcategory.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarCategoria();
  });

  $formEdit.addEventListener("submit", (e) => {
    console.log("hola")
    e.preventDefault();
    editCategory();

  });

  const paintCategory = () => {
    $ctgNewcategory.innerHTML = "";
    category.forEach((elem) => {
      $ctgNewcategory.innerHTML += `<div class="m-4">
    <div class="columns is-mobile px-4">
      <div class="column is-9"><span class=" column tag is-primary is-light">${elem.titulo}</span></div>
      <div class="column is-1"><button class="button tag is-link is-inverted btn-edit" id=${elem.id}>Editar</button></div>
      <div class="column is-1"><button class="button tag is-link is-inverted btn-delete" id=${elem.id}>Eliminar</button></div>
    </div>
    </div>`;
    });
    let $btnDelete = document.querySelectorAll(".btn-delete");
    $btnDelete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let idAEliminar = e.target.id;
        category = category.filter((items) => items.id !== idAEliminar);
        localStorage.setItem("datosCtg", JSON.stringify(category));
        paintCategory();
      });
    });

    let $btnEdit = document.querySelectorAll(".btn-edit");
    $btnEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        $containerCategory.classList.add("is-hidden");
        $conEditCtg.classList.remove("is-hidden");
        const categoryEdit = category.find(option => option.id === e.target.id);
        $inputEdit.value = categoryEdit.titulo;
      });
    });
  };

  paintCategory();





























});
