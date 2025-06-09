let saldo: number = 0;
let transacciones: number[] = [];

function consultarSaldo(): void {
    mostrarMensaje(`Tu saldo actual es: $${saldo}`);
}

function registrarTransaccion(monto: number): void {
    if (transacciones.length >= 5) {
        transacciones.shift();
    }
    transacciones.push(monto);
}

function depositar(): void {
    const input = document.getElementById("deposito") as HTMLInputElement;
    const monto: number = parseFloat(input.value);

    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("Monto inválido.");
        return;
    }

    saldo += monto;
    registrarTransaccion(monto);
    mostrarMensaje(`Depósito exitoso. Nuevo saldo: $${saldo}`);
    input.value = '';
}

function retirar(): void {
    const input = document.getElementById("retiro") as HTMLInputElement;
    const monto: number = parseFloat(input.value);

    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("Monto inválido.");
        return;
    }

    if (monto > 500) {
        mostrarMensaje("No puedes retirar más de $500 en una sola transacción.");
        return;
    }

    if (monto > saldo) {
        mostrarMensaje("Saldo insuficiente.");
        return;
    }

    saldo -= monto;
    registrarTransaccion(-monto);
    mostrarMensaje(`Retiro exitoso. Nuevo saldo: $${saldo}`);
    input.value = '';
}

function verTransacciones(): void {
    if (transacciones.length === 0) {
        mostrarMensaje("No hay transacciones registradas.");
        return;
    }

    let mensaje: string = "<strong>Últimas transacciones:</strong><br>";
    transacciones.forEach((monto, index) => {
        const tipo = monto > 0 ? "Depósito" : "Retiro";
        mensaje += `${index + 1}. ${tipo}: $${Math.abs(monto)}<br>`;
    });

    mostrarMensaje(mensaje);
}

function mostrarMensaje(msg: string): void {
    const output = document.getElementById("output");
    if (output) {
        output.innerHTML = msg;
    }
}
