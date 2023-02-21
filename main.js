const $ = (elemento) => document.querySelector(elemento);


window.addEventListener("load", function () {
  let category = localStorage.getItem("datosCtg") ? JSON.parse(localStorage.getItem("datosCtg")) : [];
  let operation = localStorage.getItem("datos") ? JSON.parse(localStorage.getItem("datos")) : [];
  let categoryToEdit;
  let operationToEdit;
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

  //seccion de crear/ editar / eliminar categoria
  const $inputcategory = $("#ipt-text-name");
  const $ctgNewcategory = $("#container-ctg");
  const $formNewcategory = $("#form-category");
  const $conEditCtg = $("#category-edit");
  const $inputEdit = $("#b");
  const $formEdit = $("#a");
  const $btnCEdit = $("#cancel-edit")

  //seccion de crear operaciones
  const $formOperat = $("#form-operation");
  const $inputDescrip = $("#ipt-operations");
  const $inputMonto = $("#ipt-amount");
  const $selectOperat = $("#selec-type");
  const $selectCtg = $("#selec-ctg");
  const $inputDate = $("#ip-date-new");
const $color = $("monto-cl");
  const $containNewOpt = $(".contain-opt");
  const $infoOpt = $(".inf");
  const contTitulos =$(".titulos")

  //seccion de editar operaciones
  const sectionEdit = $("#operation-Edit");
  const $inputEditOp = $("#ipt-editop");
  const $inptMontoedt = $("#ipt-amount-ed");
  const $selectEditType = $("#selec-type-ed");
  const $selectEditCtg = $("#selec-ctg-ed");
  const $inpEditDate = $("#ip-date-ed");
  const $formOpEdit = $("#form-op-edit");
  const $btnCancelEdit = $("#close-ed");

  //box balance
  const $gananciaTotal = $("#total-gain");
  const $gastosTotal = $("#total-spends");
  const $totalBalance = $("#total");

  //box filtros
 /*  let operationCopy = [...operation]; */
  const $filterCategory = $("#selec-filter-Ctg");
  const $filterType = $("#selec-filter-tp");
  const $filterDay = $("#ip-date-filter");
  const $filterOrder = $("#selec-filter-ord");


  /* FUNCIONES */
  //activar el menu burgur
  const activeNacBar = () => {
    $navEnd.classList.toggle("is-active");
    $btnNavBar.classList.toggle("is-active");
  }

  const fecha = new Date();
    let mes = fecha.getMonth() 
    let dia = fecha.getDate(); 
    const anio = fecha.getFullYear(); 
    if(dia<10)
      dia='0'+dia; 
    if(mes<10)
      mes='0'+(mes +1)  
    const fechaActualParaInput = `${anio}-${mes}-${dia}`
    $inputDate.value = fechaActualParaInput
    $filterDay.value = fechaActualParaInput
  /* --------funciones para la seccion balance/operaciones------- */
  //pintar las operaciones
  const paintOperation = (arr) => {
    $containNewOpt.innerHTML = "";
    arr.forEach((option) => {
      $containNewOpt.innerHTML +=
        `<div class=" container m-4">
  <div class="columns is-mobile mb-6 ">
      <div class="column tag is-info is-light is-size-7 has-text-link-dark">${option.description}</div>
      <div class="column">${option.category}</div>
      <div class="column">${option.date.slice(8,10)}/${option.date.slice(5,7)}/${option.date.slice(0,4)}</div>
      <div class="column">${option.type === "Ganancia" ? "+" : "-"}${option.amount}</div>
      <div class="column">
      <button class="button tag is-link is-inverted btn-editOp" type="button" id=${option.id}>Editar</button>
      <button class="button tag is-link is-inverted btn-deleteOp" id=${option.id}>Eliminar</button>
      </div>
  </div>

    </div>`;
    });

    if(arr.length<1){
      $infoOpt.classList.remove("is-hidden");
      contTitulos.classList.add("is-hidden");
    }else{
      $infoOpt.classList.add("is-hidden");
      contTitulos.classList.remove("is-hidden");
    } 
    let $btnDeleteOp = document.querySelectorAll(".btn-deleteOp");
    $btnDeleteOp.forEach((btnOp) => {
      btnOp.addEventListener("click", (e) => {
        operation = operation.filter((item) => item.id !== e.target.id);
        localStorage.setItem("datos", JSON.stringify(operation));
        paintOperation(operation);
      });
    });

    let $btnEditOp = document.querySelectorAll(".btn-editOp");
    $btnEditOp.forEach((btnOp) => {
      btnOp.addEventListener("click", (e) => {
        $containerBalance.classList.add("is-hidden");
        $newOperacion.classList.add("is-hidden");
        sectionEdit.classList.remove("is-hidden");
        operationToEdit = arr.find(opt => opt.id === e.target.id);
        $inputEditOp.value = operationToEdit.description;
        $selectEditCtg.value = operationToEdit.category;
        $inpEditDate.value = operationToEdit.date;
        $selectEditType.value = operationToEdit.type;
        $inptMontoedt.value = operationToEdit.amount;
      });
    });

  };
  paintOperation(operation);
  //box balance
  let balance= ()=>{
    const ganancias = operation.filter(opcion => opcion.type === "Ganancia").map((valor) => Number(valor.amount));
   
    const gananciaResul = ganancias.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  
    const gastos = operation.filter(opcion => opcion.type === "Gastos").map((valor) => Number(valor.amount));
    
    const gastosResul = gastos.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    let resultado = gananciaResul + gastosResul;
    $gananciaTotal.innerText =`+${gananciaResul}`
    $gastosTotal.innerText =`-${gastosResul}`
    $totalBalance.innerText =`${resultado}`
    
    }
  let agregarOperacion = () => {
    operation.push({
      id: crypto.randomUUID(),
      description: $inputDescrip.value,
      category: $selectCtg.value,
      date: $inputDate.value,
      type: $selectOperat.value,
      amount: Number($inputMonto.value),

    });
    localStorage.setItem("datos", JSON.stringify(operation));
    balance()
    paintOperation(operation);
    
  };
console.log(operation)
  let editOperation = () => {
    operation = operation.map((dato) => {
      if (dato.id === operationToEdit.id) {
        dato.description = $inputEditOp.value;
        dato.category = $selectEditCtg.value;
        dato.date = $inpEditDate.value;
        dato.type = $selectEditType.value;
        dato.amount = $inptMontoedt.value;
      }
      return dato;
    });
    localStorage.setItem("datos", JSON.stringify(operation));
    
    paintOperation(operation);
  };
//levar las categorias a lo select de categorias

const mostrarCategoria = (container) => {
  category.forEach(function(dato) {
    container.innerHTML += `
    <option value="${dato.titulo.toLowerCase()}">${dato.titulo}</option>
    `;
  });
 
};
// filtros

$filterType.addEventListener("input", () => {
  filterByType()
});
let filterByType= ()=>{
  
  if ($filterType.value !== "todos") {
    let copy = operation.filter((opt) => opt.type === $filterType.value);
    paintOperation(copy);  
  } else {
    paintOperation(operation);
  }
};

$filterCategory.addEventListener("change", () => {
  filterByCategory()
});
let filterByCategory= ()=>{
  if ($filterCategory.value !== "todos") {
    let copy  = operation.filter((opt) => opt.category === $filterCategory.value);
    paintOperation(copy);
  }else{
    paintOperation(operation);
  }

};

$filterDay.addEventListener("change", () => {
  filterByDate()
});
let filterByDate = ()=>{
  let copy= operation.filter((opt) => opt.date >= $filterDay.value);
paintOperation(copy);
};


$filterOrder.addEventListener("change", () => {
  order();
});
let order = () => {
  if($filterOrder.value === "masReciente"){
    $containNewOpt.innerHTML = "";
    let copy= operation.sort((x, y) => y.date.localeCompare(x.date));
    paintOperation(copy)
  }
  if($filterOrder.value === "menosReciente"){
    let copy = operation.sort((x, y) => x.date.localeCompare(y.date));
    paintOperation(copy);
    console.log(copy)
  }

  if($filterOrder.value === "menor"){
    let copy = operation.sort((a, b) => a.amount - b.amount);
    paintOperation(copy);
    console.log(copy)
    
  }
  if($filterOrder.value === "mayor"){
    let copy= operation.sort((a, b) => b.amount - a.amount);
    paintOperation(copy);
    console.log(copy)
  }

  if($filterOrder.value === "a/z"){
    let copy= operation.sort((x, y) => x.description.localeCompare(y.description));
    paintOperation(copy);
  }


  if($filterOrder.value === "z/a"){
    let copy= operation.sort((x, y) => y.description.localeCompare(x.description));
    paintOperation(copy);
    console.log(copy)
  }else{
paintOperation(operation)
  }
};


  /* --------funciones para la seccion categoria------- */
  //agrega una nueva categoria
  const paintCategory = () => {
    $ctgNewcategory.innerHTML = "";
    category.forEach((elem) => {
      $ctgNewcategory.innerHTML += `<div class="m-4">
    <div class="columns is-mobile px-4">
      <div class="column is-9"><span class=" column tag is-info is-light is-size-6 has-text-link-dark">${elem.titulo}</span></div>
      <div class="column is-1"><button class="button tag is-link is-inverted btn-edit" type="button" id=${elem.id} type="button">Editar</button></div>            
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
  $btnCEdit.addEventListener("click", () => {
    $conEditCtg.classList.add("is-hidden");
    $containerCategory.classList.remove("is-hidden");
  });

  let agregarCategoria = () => {
    category.push({
      id: crypto.randomUUID(),
      titulo: $inputcategory.value
    });
    localStorage.setItem("datosCtg", JSON.stringify(category));
    paintCategory();
    mostrarCategoria($filterCategory);
    mostrarCategoria($selectCtg);
    mostrarCategoria($selectEditCtg);
  };

  let editCategory = () => {
    category = category.map((item) => {
      if (item.id === categoryToEdit.id) {
        item.titulo = $inputEdit.value;
      }
      return item;
    });
    localStorage.setItem("datosCtg", JSON.stringify(category));
    paintCategory();
  };


  /* ---------------funciones para reportes----------- */
 

  /* EVENTOS */
  // evento menu burgur 
  $btnNavBar.addEventListener("click", activeNacBar);

  //cambio de vistas
  btnBalance.addEventListener("click", () => {
    $containerBalance.classList.remove("is-hidden");
    $containerCategory.classList.add("is-hidden");
    $containerReports.classList.add("is-hidden");
    $conEditCtg.classList.add("is-hidden");
    $newOperacion.classList.add("is-hidden");
    sectionEdit.classList.add("is-hidden");
  });

  btnCategory.addEventListener("click", () => {
    $containerCategory.classList.remove("is-hidden");
    $containerBalance.classList.add("is-hidden");
    $containerReports.classList.add("is-hidden");
    $conEditCtg.classList.add("is-hidden");
    $newOperacion.classList.add("is-hidden");
    sectionEdit.classList.add("is-hidden");
  });

  btnReports.addEventListener("click", () => {
    $containerReports.classList.remove("is-hidden");
    $containerCategory.classList.add("is-hidden");
    $containerBalance.classList.add("is-hidden");
    $conEditCtg.classList.add("is-hidden");
    $newOperacion.classList.add("is-hidden");
    sectionEdit.classList.add("is-hidden");
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

  /* -------------------inicio de operaciones------------------- */

  $formOperat.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarOperacion();
    $newOperacion.classList.add("is-hidden");
    $containerBalance.classList.remove("is-hidden");

  });
  $formOpEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    editOperation();
    sectionEdit.classList.add("is-hidden");
    $containerBalance.classList.remove("is-hidden");
  });
  $btnCancelOp.addEventListener("click", () => {
    $newOperacion.classList.add("is-hidden");
    $containerBalance.classList.remove("is-hidden");
  });
 

  $btnCancelEdit.addEventListener("click", () => {
    sectionEdit.classList.add("is-hidden");
    $containerBalance.classList.remove("is-hidden");
    
  });
 
  /* ----------------------inicio categoria-------------------- */
  //crear nueva categoria
  $formNewcategory.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarCategoria();
  });

  $formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    editCategory();
    $conEditCtg.classList.add("is-hidden");
    $containerCategory.classList.remove("is-hidden");
    $inputcategory.value = "";
  });

  

  





























});
