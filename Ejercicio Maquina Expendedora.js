/*const productos = ['Agua', 'Galletas', 'Jugo', 'Chicles', 'Chocolate'];
let cantidades = [1, 0, 2, 0, 1];

function mostrarInventario() {
  console.clear();
  console.log('Inventario disponible:');
  for (let i = 0; i < productos.length; i++) {
    console.log(i + ' - ' + productos[i] + ': ' + cantidades[i] + ' unidades');
  }
}

function procesarPago() {
  alert('Por favor, inserte una moneda de $1');
  return true;
}

function entregarProducto(codigo) {
  let indice = Number(codigo);
  if (isNaN(indice) || indice < 0 || indice >= productos.length) {
    alert('Código inválido, inténtelo de nuevo');
    return false;
  }

  if (cantidades[indice] <= 0) {
    let sugerencia = cantidades.findIndex(cantidad => cantidad > 0);
    if (sugerencia === -1) {
      alert('Lo siento, todos los productos están agotados');
      return false;
    } else {
      alert('Producto agotado. Puede probar con: ' + productos[sugerencia] + ' (Código ' + sugerencia + ')');
      return false;
    }
  }

  if (!procesarPago()) {
    alert('Pago incorrecto');
    return false;
  }

  cantidades[indice]--;
  alert('Producto entregado: ' + productos[indice] + '. ¡Gracias por su compra!');
  return true;
}

function algunProductoAgotado() {
  return cantidades.some(cantidad => cantidad === 0);
}

function maquinaExpendedora() {
  mostrarInventario();
  
  let codigo = prompt('Ingrese el código del producto que desea comprar:');
  
  if (codigo === null) {
    alert('Compra cancelada, hasta luego');
    return;
  }
  
  if (codigo.trim() === '') {
    alert('No se ingresó ningún código. Intente de nuevo.');
    maquinaExpendedora(); 
    return;
  }

  if (entregarProducto(codigo)) {
    mostrarInventario();
  }

  maquinaExpendedora();
}

maquinaExpendedora();*/


const inventario = new Map([
  ['Agua', 1],
  ['Galletas', 0],
  ['Jugo', 2],
  ['Chicles', 0],
  ['Chocolate', 1]
]);

function mostrarInventario() {
  console.clear();
  console.log('Inventario disponible:');
  inventario.forEach((cantidad, producto) => {
    console.log(`${producto}: ${cantidad} unidades`);
  });
}

function procesarPago() {
  alert('Por favor, inserte una moneda de $1');
  return true;
}

function entregarProducto(codigo) {
  const producto = Array.from(inventario.keys())[codigo];
  
  if (!producto) {
    alert('Código inválido, inténtelo de nuevo');
    return false;
  }

  const cantidad = inventario.get(producto);
  
  if (cantidad <= 0) {
    let sugerencia = Array.from(inventario.entries()).find(([_, cantidad]) => cantidad > 0);
    if (!sugerencia) {
      alert('Lo siento, todos los productos están agotados');
      return false;
    } else {
      alert(`Producto agotado. Puede probar con: ${sugerencia[0]} (Código ${Array.from(inventario.keys()).indexOf(sugerencia[0])})`);
      return false;
    }
  }


  inventario.set(producto, cantidad - 1);
  alert(`Producto entregado: ${producto}. ¡Gracias por su compra!`);
  return true;
}

function algunProductoAgotado() {
  return Array.from(inventario.values()).some(cantidad => cantidad === 0);
}

function maquinaExpendedora() {
  mostrarInventario();
  
  let codigo = prompt('Ingrese el código del producto que desea comprar:');
  
  if (codigo === null) {
    alert('Compra cancelada, hasta luego');
    return;
  }
  
 
  }

  if (entregarProducto(codigo)) {
    mostrarInventario();
  }


maquinaExpendedora();

  
