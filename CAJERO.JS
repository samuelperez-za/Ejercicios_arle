
    let saldo = 0;
    let transacciones = [];

    function consultarSaldo() {
        mostrarMensaje(`Tu saldo actual es: $${saldo}`);
    }

    function registrarTransaccion(monto) {
        if (transacciones.length >= 5) {
            transacciones.shift();
        }
        transacciones.push(monto);
    }

    function depositar() {
        let monto = parseFloat(document.getElementById("deposito").value);
        if (isNaN(monto) || monto <= 0) {
            mostrarMensaje("Monto inválido.");
            return;
        }
        saldo += monto;
        registrarTransaccion(monto);
        mostrarMensaje(`Depósito exitoso. Nuevo saldo: $${saldo}`);
        document.getElementById("deposito").value = '';
    }

    function retirar() {
        let monto = parseFloat(document.getElementById("retiro").value);
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
        document.getElementById("retiro").value = '';
    }

    function verTransacciones() {
        if (transacciones.length === 0) {
            mostrarMensaje("No hay transacciones registradas.");
            return;
        }
        let mensaje = "<strong>Últimas transacciones:</strong><br>";
        for (let i = 0; i < transacciones.length; i++) {
            let tipo = transacciones[i] > 0 ? "Depósito" : "Retiro";
            mensaje += `${i + 1}. ${tipo}: $${Math.abs(transacciones[i])}<br>`;
        }
        mostrarMensaje(mensaje);
    }

    function mostrarMensaje(msg) {
        document.getElementById("output").innerHTML = msg;
    }
