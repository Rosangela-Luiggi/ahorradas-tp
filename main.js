const $ = (elemento) => document.querySelector(elemento);


let operation = [];

window.addEventListener("load", function () {
   let category = localStorage.getItem("datosCtg") ? JSON.parse(localStorage.getItem("datosCtg")) : [];
  let categoryToEdit;       
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

/*   //seccion de operaciones
 const $formOperat = $("#form-operation");
  const $inputDescrip = $("#ipt-operations");
  const $inputMonto = $("#ipt-amount");
  const $selectOperat = $("#selec-type");
  const $selectCtg = $("#selec-ctg");
  const $inputDate = $("#ip-date-new");

  const $containNewOpt = $(".contain-opt");
  const $infoOpt = $(".inf"); */ 

 
  



  /* FUNCIONES */
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
  let editCategory = () => {
    category = category.map((item) => {
      if (item.id === categoryToEdit.id) {   // COMPARAMOS SI LA CATEGORIA GUARDADA TIENE EL MISMO ID QUE LA QUE ITERAMOS
        item.titulo = $inputEdit.value;     // SI SON IGUALES LE CAMBIAMOS EL VALOR
      }
      return item;     // PARA FINALIZAR EL MAP SIEMPRE RETORNA UN NUEVO ARRAY ENTONCES DEBEMOS DEVOLVER EL OBJETO Y NO SOLO EL TITULO
    });
    localStorage.setItem("datosCtg", JSON.stringify(category));
    paintCategory();            // DESPUES DE EDITAR CORRECTAMENTE VUELVO A PINTAR LAS CATEGORIAS
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
   /*  $containNewOpt.classList.add("is-hidden"); */
  });

  btnCategory.addEventListener("click", () => {
    $containerCategory.classList.remove("is-hidden");
    $containerBalance.classList.add("is-hidden");
    $containerReports.classList.add("is-hidden");
    $conEditCtg.classList.add("is-hidden");
    /* $containNewOpt.classList.toggle("is-hidden"); */
  });

  btnReports.addEventListener("click", () => {
    $containerReports.classList.remove("is-hidden");
    $containerCategory.classList.add("is-hidden");
    $containerBalance.classList.add("is-hidden");
    $conEditCtg.classList.add("is-hidden");
   /*  $containNewOpt.classList.add("is-hidden"); */

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

  /* -------------------inicio de operaciones------------------- */
/* 
  let agregarOperacion = () => {
    operation.push({
      id: crypto.randomUUID(),
      description: $inputDescrip.value,
      category: $selectCtg.value,
      date: $inputDate.value,
      type: $selectOperat.value,
      amount: $inputMonto.value,
      
    });
    localStorage.setItem("datosOp", JSON.stringify(operation));
    return paintOperation();
  };

  $formOperat.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarOperacion();
  });

  const paintOperation = () => {
    $containNewOpt.innerHTML = "";
    operation.forEach((option) => {
     $containNewOpt.innerHTML +=
      `<div class=" container m-4">
    <div class="columns is-mobile mb-6 has-text-weight-semibold">
        <div class="column">Descrición</div>
        <div class="column">Categoría</div>
        <div class="column">Fecha</div>
        <div class="column">Monto</div>
        <div class="column">Acciones</div>
    </div>
    <div class="columns is-mobile mb-6 ">
        <div class="column tag is-info is-light">${option.description}</div>
        <div class="column">${option.category}</div>
        <div class="column">${option.date}</div>
        <div class="column">${option.Tipo == "Ingreso" ? "+" : "-"}${option.amount}</div>
        <div class="column">
        <button class="button tag is-link is-inverted btn-editOp" id=${option.id}>Editar</button>
        <button class="button tag is-link is-inverted btn-deleteOp" id=${option.id}>Eliminar</button>
        </div>
    </div>

    </div>`;
    });
    let $btnDeleteOp = document.querySelectorAll(".btn-deleteOp");
    $btnDeleteOp.forEach((btnOp) => {
      btnOp.addEventListener("click", (e) => {
        let idAEliminarOp = e.target.id;
        category = category.filter((items) => items.id !== idAEliminarOp);
        localStorage.setItem("datosCtg", JSON.stringify(category));
        paintOperation();
      });
    });
  };
  paintOperation(); */



  /* ----------------------inicio categoria-------------------- */

  
   //crear nueva categoria
  $formNewcategory.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarCategoria();
  });

  $formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    editCategory();
  });

  const paintCategory = () => {
    $ctgNewcategory.innerHTML = "";
    category.forEach((elem) => {
      $ctgNewcategory.innerHTML += `<div class="m-4">
    <div class="columns is-mobile px-4">
      <div class="column is-9"><span class=" column tag is-primary is-light">${elem.titulo}</span></div>
      <div class="column is-1"><button class="button tag is-link is-inverted btn-edit" type="button" id=${elem.id}>Editar</button></div>            
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
        categoryToEdit = category.find(option => option.id === e.target.id);       
        $inputEdit.value = categoryToEdit.titulo;    
      });
    });
  };

  paintCategory();





























});
