enum TIPO_CLIENTE {
    PREFERENCIAL = 'preferencial',
    GENERAL = 'general',
    SIN_CUENTA = 'sin_cuenta'
}

enum TIPO_ATENCION {
    CAJA = 'caja',
    ASESORIA = 'asesoria'
}

enum TIPO_CAJA {
    DEPOSITO = 'deposito',
    RETIRO = 'retiro'
}

interface Cliente {
    nombre: string;
    tipo: TIPO_CLIENTE;
    atencion: TIPO_ATENCION;
    caja?: TIPO_CAJA | null;
}

interface Caja {
    id: number;
    tipo: TIPO_CAJA | TIPO_ATENCION;
    ocupada: boolean;
    cliente: Cliente | null;
}

const cajas: Caja[] = [
    { id: 1, tipo: TIPO_CAJA.RETIRO, ocupada: false, cliente: null },
    { id: 2, tipo: TIPO_CAJA.RETIRO, ocupada: false, cliente: null },
    { id: 3, tipo: TIPO_CAJA.DEPOSITO, ocupada: false, cliente: null },
    { id: 4, tipo: TIPO_CAJA.DEPOSITO, ocupada: false, cliente: null },
    { id: 5, tipo: TIPO_ATENCION.ASESORIA, ocupada: false, cliente: null }
];

let colaPreferencial: Cliente[] = [];
let colaGeneral: Cliente[] = [];
let colaSinCuenta: Cliente[] = [];

function agregarCliente(cliente: Cliente): void {
    switch (cliente.tipo) {
        case TIPO_CLIENTE.PREFERENCIAL:
            colaPreferencial.push(cliente);
            break;
        case TIPO_CLIENTE.GENERAL:
            colaGeneral.push(cliente);
            break;
        case TIPO_CLIENTE.SIN_CUENTA:
            colaSinCuenta.push(cliente);
            break;
    }
    mostrarEstado();
}

// Para usar en navegador, asignar a window
// @ts-ignore
window.agregarClientePrompt = function agregarClientePrompt(): void {
    const nombre = prompt("Nombre del cliente:");
    if (!nombre) return;

    const tipoStr = prompt("Tipo de cliente (preferencial, general, sin_cuenta):");
    if (!tipoStr || !(Object.values(TIPO_CLIENTE) as string[]).includes(tipoStr.toLowerCase())) {
        alert("Tipo de cliente inválido.");
        return;
    }
    const tipo = tipoStr.toLowerCase() as TIPO_CLIENTE;

    const atencionStr = prompt("Tipo de atención (caja, asesoria):");
    if (!atencionStr || !(Object.values(TIPO_ATENCION) as string[]).includes(atencionStr.toLowerCase())) {
        alert("Tipo de atención inválido.");
        return;
    }
    const atencion = atencionStr.toLowerCase() as TIPO_ATENCION;

    let caja: TIPO_CAJA | null = null;
    if (atencion === TIPO_ATENCION.CAJA) {
        const cajaStr = prompt("Tipo de caja (deposito, retiro):");
        if (!cajaStr || !(Object.values(TIPO_CAJA) as string[]).includes(cajaStr.toLowerCase())) {
            alert("Tipo de caja inválido.");
            return;
        }
        caja = cajaStr.toLowerCase() as TIPO_CAJA;
    }

    agregarCliente({
        nombre,
        tipo,
        atencion,
        caja: caja ? caja : null
    });
}

function obtenerSiguienteCliente(tipoAtencion: TIPO_ATENCION, tipoCaja: TIPO_CAJA | null = null): Cliente | null {
    const colas: Cliente[][] = [colaPreferencial, colaGeneral, colaSinCuenta];
    for (const c of colas) {
        const idx = c.findIndex(cliente =>
            cliente.atencion === tipoAtencion &&
            (tipoAtencion === TIPO_ATENCION.CAJA ? cliente.caja === tipoCaja || tipoCaja === null : true)
        );
        if (idx !== -1) {
            return c.splice(idx, 1)[0];
        }
    }
    return null;
}

// @ts-ignore
window.asignarClientes = function asignarClientes(): void {
    const mensajes: string[] = [];
    for (const caja of cajas) {
        if (!caja.ocupada) {
            if (caja.id === 5) { // Solo asesoría
                const cliente = obtenerSiguienteCliente(TIPO_ATENCION.ASESORIA);
                if (cliente) {
                    caja.ocupada = true;
                    caja.cliente = cliente;
                    mensajes.push(`Cliente ${cliente.nombre} atendido en caja ${caja.id} (Asesoría)`);
                }
            } else if (caja.tipo === TIPO_CAJA.RETIRO) {
                const cliente = obtenerSiguienteCliente(TIPO_ATENCION.CAJA, TIPO_CAJA.RETIRO);
                if (cliente) {
                    caja.ocupada = true;
                    caja.cliente = cliente;
                    mensajes.push(`Cliente ${cliente.nombre} atendido en caja ${caja.id} (Retiro)`);
                }
            } else if (caja.tipo === TIPO_CAJA.DEPOSITO) {
                const cliente = obtenerSiguienteCliente(TIPO_ATENCION.CAJA, TIPO_CAJA.DEPOSITO);
                if (cliente) {
                    caja.ocupada = true;
                    caja.cliente = cliente;
                    mensajes.push(`Cliente ${cliente.nombre} atendido en caja ${caja.id} (Depósito)`);
                }
            }
        }
    }
    if (mensajes.length === 0) mensajes.push("No hay clientes para atender o todas las cajas están ocupadas.");
    alert(mensajes.join('\n'));
    mostrarEstado();
}

// @ts-ignore
window.liberarCajaPrompt = function liberarCajaPrompt(): void {
    const id = prompt("Ingrese el número de caja a liberar (1-5):");
    const num = parseInt(id ?? "");
    if (isNaN(num) || num < 1 || num > 5) {
        alert("Número de caja inválido.");
        return;
    }
    liberarCaja(num);
}

function liberarCaja(idCaja: number): void {
    const caja = cajas.find(c => c.id === idCaja);
    if (caja && caja.ocupada && caja.cliente) {
        alert(`Caja ${idCaja} liberada por cliente ${caja.cliente.nombre}`);
        caja.ocupada = false;
        caja.cliente = null;
    } else {
        alert("La caja ya está libre.");
    }
    mostrarEstado();
}

function mostrarEstado(): void {
    let estado = "Cajas:\n";
    for (const caja of cajas) {
        estado += `Caja ${caja.id}: ${caja.ocupada && caja.cliente ? "Ocupada por " + caja.cliente.nombre : "Libre"}\n`;
    }
    estado += "\nCola Preferencial: " + colaPreferencial.map(c=>c.nombre).join(", ") + "\n";
    estado += "Cola General: " + colaGeneral.map(c=>c.nombre).join(", ") + "\n";
    estado += "Cola Sin Cuenta: " + colaSinCuenta.map(c=>c.nombre).join(", ") + "\n";
    const estadoElem = document.getElementById("estado");
    if (estadoElem) estadoElem.textContent = estado;
}

// Para pruebas en navegador, llamar mostrarEstado al cargar
mostrarEstado();