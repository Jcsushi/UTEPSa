function validarEmail(correo) {
    let cantidadArrobas = 0;
    let posicionArroba = -1;
    let tienePuntoDespues = false;

    for (let i = 0; i < correo.length; i++) {
        let c = correo[i];

        if (c === " ") {
            return false;
        }

        if (c === "@") {
            cantidadArrobas++;
            posicionArroba = i;
        }
    }

    if (cantidadArrobas !== 1) {
        return false;
    }

    if (posicionArroba === 0 || posicionArroba === correo.length - 1) {
        return false;
    }

    for (let i = posicionArroba + 2; i < correo.length - 1; i++) {
        if (correo[i] === ".") {
            tienePuntoDespues = true;
        }
    }

    return tienePuntoDespues;
}

function registrarEstudiante() {
    const nombre = document.getElementById("nombre").value.trim();
    const edadValor = document.getElementById("edad").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const notaValor = document.getElementById("nota").value.trim();

    // 1. Validación mejorada de Nombre (mínimo 3 caracteres para evitar campos vacíos o símbolos sueltos)
    if (nombre === "" || nombre.length < 3) {
        alert("Por favor, ingrese un nombre y apellido válido (mínimo 3 caracteres).");
        document.getElementById("nombre").focus();
        return;
    }

    // 2. Validación de Edad
    if (edadValor === "") {
        alert("Por favor, ingrese la edad del estudiante.");
        document.getElementById("edad").focus();
        return;
    }

    const edad = parseInt(edadValor);
    if (isNaN(edad) || edad < 5 || edad > 100) {
        alert("La edad debe ser un número válido entre 5 y 100 años.");
        document.getElementById("edad").focus();
        return;
    }

    // 3. Validación de Correo
    if (!validarEmail(correo)) {
        alert("El correo ingresado no es válido. Por favor, vuelva a ingresarlo con un formato correcto (ejemplo: usuario@gmail.com).");
        document.getElementById("correo").focus();
        return;
    }

    // 4. Validación de Nota
    if (notaValor === "") {
        alert("Por favor, ingrese una nota.");
        document.getElementById("nota").focus();
        return;
    }

    const nota = parseFloat(notaValor);

    if (isNaN(nota) || nota < 0 || nota > 100) {
        alert("La nota no puede ser menor a 0 ni mayor a 100. Vuelva a intentarlo.");
        document.getElementById("nota").focus();
        return;
    }

    const esAprobado = nota > 51;
    const estadoTexto = esAprobado ? "Aprobado" : "Reprobado";
    const claseEstado = esAprobado ? "aprobado" : "reprobado";

    const contenedor = document.getElementById("contenedorTarjetas");

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-estudiante " + claseEstado;

    // Se incluye la edad en la tarjeta visual generada
    tarjeta.innerHTML = `
        <div class="nombre">${nombre}</div>
        <div class="edad">Edad: ${edad} años</div>
        <div class="correo">${correo}</div>
        <div class="nota">Nota: ${nota}</div>
        <div class="estado">${estadoTexto}</div>
    `;

    contenedor.appendChild(tarjeta);

    // Limpiar campos después del registro exitoso
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("nota").value = "";
    document.getElementById("nombre").focus();
}