// Variables principales
let valorMostrado = '';        // número que se está mostrando actualmente
let operacionMostrada = '';    // operación completa para mostrar en pantalla
let primerNumero = null;       // Guarda el primer número de la operación
let operador = null;           // Guarda el operador seleccionado (+, -, X, /)
let esperandoSegundoNumero = false;  

// Elemento de la pantalla donde se muestran los números
const pantalla = document.getElementById('display');  

// Agregar eventos a todos los botones
document.querySelectorAll('button').forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        // Manejo de números y punto decimal
        if ('0123456789.'.includes(valor)) {
            // Evitar múltiples puntos decimales
            if (valor === '.' && valorMostrado.includes('.')) {
                return;
            }
            
            // Lógica para mostrar números en pantalla
            if (esperandoSegundoNumero) {
                valorMostrado = valor;
                esperandoSegundoNumero = false;
            } else {
                valorMostrado = valorMostrado === '0' ? valor : valorMostrado + valor;
            }
            // Actualizar la operación mostrada
            if (operador) {
                operacionMostrada = `${primerNumero} ${operador} ${valorMostrado}`;
            } else {
                operacionMostrada = valorMostrado;
            }

        // Manejo de operadores matemáticos
        } else if ('+-X/'.includes(valor)) {
            primerNumero = parseFloat(valorMostrado);
            operador = valor;
            esperandoSegundoNumero = true;
            operacionMostrada = `${primerNumero} ${operador}`;

        // Realizar el cálculo cuando se presiona igual
        } else if (valor === '=') {
            if (operador && primerNumero !== null) {
                const segundoNumero = parseFloat(valorMostrado);
                // Realizar la operación según el operador
                switch (operador) {
                    case '+': valorMostrado = primerNumero + segundoNumero; break;
                    case '-': valorMostrado = primerNumero - segundoNumero; break;
                    case 'X': valorMostrado = primerNumero * segundoNumero; break;
                    case '/': valorMostrado = primerNumero / segundoNumero; break;
                }
                operacionMostrada = valorMostrado;
                primerNumero = null;
                operador = null;
            }

        // Limpiar todos los valores (botón AC)
        } else if (valor === 'AC') {
            valorMostrado = '';
            operacionMostrada = '';
            primerNumero = null;
            operador = null;
            esperandoSegundoNumero = false;

        // Función de borrar (botón ⬅️)
        } else if (valor === '⬅️') {
            // Si estamos escribiendo el segundo número
            if (operador && !esperandoSegundoNumero) {
                valorMostrado = valorMostrado.slice(0, -1);
                operacionMostrada = `${primerNumero} ${operador} ${valorMostrado}`;
            // Si acabamos de escribir un operador
            } else if (operador && esperandoSegundoNumero) {
                operador = null;
                esperandoSegundoNumero = false;
                operacionMostrada = primerNumero;
                valorMostrado = primerNumero.toString();
                primerNumero = null;
            // Si estamos escribiendo el primer número
            } else {
                valorMostrado = valorMostrado.slice(0, -1);
                operacionMostrada = valorMostrado;
            }
            
            // Resetear a 0 si se borra todo
            if (!valorMostrado && !operador && !primerNumero) {
                valorMostrado = '';
                operacionMostrada = '0';
            }

        // Calcular porcentaje
        } else if (valor === '%') {
            valorMostrado = parseFloat(valorMostrado) / 100;
            operacionMostrada = valorMostrado;
        }

        // Actualizar el valor mostrado en pantalla
        pantalla.textContent = operacionMostrada || '0';
    });
});
