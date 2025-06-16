interface Product {
  name: string;
  quantity: number;
}

class VendingMachine {
  private products: string[];
  private quantities: number[];

  constructor(products: Product[]) {
    this.products = products.map(p => p.name);
    this.quantities = products.map(p => p.quantity);
  }

  private mostrarInventario(): void {
    console.clear();
    console.log('Inventario disponible:');
    for (let i = 0; i < this.products.length; i++) {
      console.log(`${i} - ${this.products[i]}: ${this.quantities[i]} unidades`);
    }
  }

  private procesarPago(): boolean {
    alert('Por favor, inserte una moneda de $1');
    return true;
  }

  private entregarProducto(codigo: string): boolean {
    const indice: number = Number(codigo);
    
    if (isNaN(indice) || indice < 0 || indice >= this.products.length) {
      alert('Código inválido, inténtelo de nuevo');
      return false;
    }

    if (this.quantities[indice] <= 0) {
      const sugerencia: number = this.quantities.findIndex(cantidad => cantidad > 0);
      if (sugerencia === -1) {
        alert('Lo siento, todos los productos están agotados');
        return false;
      } else {
        alert(`Producto agotado. Puede probar con: ${this.products[sugerencia]} (Código ${sugerencia})`);
        return false;
      }
    }

    if (!this.procesarPago()) {
      alert('Pago incorrecto');
      return false;
    }

    this.quantities[indice]--;
    alert(`Producto entregado: ${this.products[indice]}. ¡Gracias por su compra!`);
    return true;
  }

  public algunProductoAgotado(): boolean {
    return this.quantities.some(cantidad => cantidad === 0);
  }

  public iniciar(): void {
    this.mostrarInventario();
    
    const codigo: string | null = prompt('Ingrese el código del producto que desea comprar:');
    
    if (codigo === null) {
      alert('Compra cancelada, hasta luego');
      return;
    }
    
    if (codigo.trim() === '') {
      alert('No se ingresó ningún código. Intente de nuevo.');
      this.iniciar();
      return;
    }

    if (this.entregarProducto(codigo)) {
      this.mostrarInventario();
    }

    this.iniciar();
  }
}

// Inicialización
const productos: Product[] = [
  { name: 'Agua', quantity: 1 },
  { name: 'Galletas', quantity: 0 },
  { name: 'Jugo', quantity: 2 },
  { name: 'Chicles', quantity: 0 },
  { name: 'Chocolate', quantity: 1 }
];

const maquina = new VendingMachine(productos);
maquina.iniciar();