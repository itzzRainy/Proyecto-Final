const Ingreso = require('./Ingreso');
const Egreso = require('./Egreso');


const ingresos = [
  new Ingreso('Salario', 20000),
  new Ingreso('Venta auto', 50000)
];

const egresos = [
  new Egreso('Renta', 4000),
  new Egreso('Ropa', 800)
];



const totalIngresos = () => {
  let totalIngreso = 0;

  for (const ingreso in ingresos) {
    totalIngreso += ingresos[ingreso];
  }

  return totalIngreso;
};


const totalEgresos = () => {
  let totalEgreso = 0;

  for (const egreso in egresos) {
    totalEgreso += egresos[egreso];
  }

  return totalEgreso;
};


const formatoMoneda = (valor) => {
  return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
};


const formatoPorcentaje = (valor) => {
  return valor.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 });
};



const cargarCabecero = () => {
  const presupuesto = totalIngresos() - totalEgresos();
  const porcentajeEgreso = (totalEgresos() / totalIngresos()) * 100;

  document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
  document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
  document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
};




const crearIngresoHTML = (ingreso) => {
  const ingresoHTML = `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${ingreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar_btn" onclick="eliminarIngreso(${ingreso.id})">
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `;
  return ingresoHTML;
};


const cargarIngresos = () => {
  let ingresosHTML = '';

  for (const ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }

  document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};


const crearEgresoHTML = (egreso) => {
  const egresoHTML = `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${egreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.porcentaje)}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar_btn" onclick="eliminarEgreso(${egreso.id})">
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `;
  return egresoHTML;
};


const cargarEgresos = () => {
  let egresosHTML = '';

  for (const egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }

  document.getElementById('lista-egresos').innerHTML = egresosHTML;
};




const eliminarEgreso = (id) => {
  const indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  
  if (indiceEliminar !== -1) {
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
  }
};


document.querySelector('.agregar-btn').onclick = agregarDato;


document.getElementById('forma').onsubmit = function() {
  return false;
};


const agregarDato = () => {
  const forma = document.getElementById('forma');
  const tipo = document.getElementById('tipo').value;
  const descripcion = document.getElementById('descripcion').value;
  const valor = parseFloat(document.getElementById('valor').value);

  if (descripcion.trim() !== '' && !isNaN(valor) && valor > 0) {
    if (tipo === 'ingreso') {
      ingresos.push(new Ingreso(descripcion, valor));
      cargarCabecero();
      cargarIngresos();
    } else if (tipo === 'egreso') {
      egresos.push(new Egreso(descripcion, valor));
      cargarCabecero();
      cargarEgresos();
    }

    
    forma.reset();
  }
};


const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos(); 
};