//Declaración de variable
var nombreUsuario = 'Joel Acef';
var saldoCuenta = 20000;
var limiteExtraccion = 3000;
var pagarAgua = 350;
var pagarTel = 425;
var pagarLuz = 210;
var pagarInternet = 570;
var cuentaAmiga = 12345;
var cuentaAmiga2 = 54321;
var claveUsuario = 25192;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Sumar dinero
var sumarDinero = function(dineroSumado){
    var resultadoSuma = saldoCuenta + dineroSumado;
    return resultadoSuma;
}

//Restar dinero
var restarDinero = function(dineroRestado){
    var resultadoResta = saldoCuenta - dineroRestado;
    return resultadoResta;
}

//Comprueba si hay dinero disponible
function hayDinero(montoIngresado){
    if (montoIngresado > saldoCuenta){
        alert('El monto que quiere extraer es mayor al dinero disponible, intente un monto menor');        
        return false;
    } else if (montoIngresado > limiteExtraccion) {
        alert('El monto que quiere extraer es mayor al limite de extracción, intente un monto menor');        
        return false;     
    } else if (montoIngresado%100 !== 0) {
        alert('El banco solo entrega billetes de $100');        
        return false;
    } else {
        return true;
    }
}

//Valida que el monto ingresado sea valido 
function montosNoValidos(dineroIngresado){
    if (Number.isNaN(dineroIngresado) || (dineroIngresado == '')){ 
        alert('El monto ingresado no es válido');        
        return false;
    } else {
        return true;
    }
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    nuevoLimiteDeExtraccion = parseInt(prompt('Escriba el nuevo limite de extracción'));    
    if (montosNoValidos(nuevoLimiteDeExtraccion) == true){  
        limiteExtraccion = parseInt(nuevoLimiteDeExtraccion);
        actualizarLimiteEnPantalla(limiteExtraccion);
        alert('Su nuevo limite de extracción es de: $' + limiteExtraccion);
    }
}

function extraerDinero() {
    dineroExtraido = parseInt(prompt('Escriba el monto a extraer'));
    if (montosNoValidos(dineroExtraido) == true && hayDinero(dineroExtraido) == true){
        saldoCuenta = restarDinero(dineroExtraido);
        saldoAnterior = sumarDinero(dineroExtraido);
        alert('Has retirado: $' + dineroExtraido + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta); 
        actualizarSaldoEnPantalla(saldoCuenta);
    }
}

function depositarDinero() {
    dineroDepositado = parseInt(prompt('Escriba el monto a depositar'));    
    if (montosNoValidos(dineroDepositado) == true){
        saldoCuenta = sumarDinero(dineroDepositado);
        saldoAnterior = restarDinero(dineroDepositado);
        alert('Has depositado: $' + dineroDepositado + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);
        actualizarSaldoEnPantalla(saldoCuenta);
    }
}

//Valida que mi saldo sea mayor al servicio que quiero pagar
function saldoParaAbonarServicios(servicioPagado){
    if (montosNoValidos(servicioPagado) == true && saldoCuenta > servicioPagado) {
        saldoCuenta = restarDinero(servicioPagado);            
        saldoAnterior = sumarDinero(servicioPagado);
        actualizarSaldoEnPantalla(saldoCuenta);
        alert('Has pagado el servicio de ' + nombreDelServicio +' correctamente: \nSaldo Anterior: $' + saldoAnterior + '\nDinero descontado: $' + servicioPagado + '\nSaldo Actual: $' + saldoCuenta);
        return nombreDelServicio;
    }
}

function pagarServicio() {
    var servicioElegido = parseInt(prompt('Ingrese el numero del servicio que quiere abonar:\n1-Agua \n2-Telefono \n3-Luz \n4-Internet'));
    switch (servicioElegido){
        case 1:
            nombreDelServicio = 'Agua';
            saldoParaAbonarServicios(pagarAgua);
            break;

        case 2:
            nombreDelServicio = 'Telefono';
            saldoParaAbonarServicios(pagarTel);
            break;

        case 3:            
            nombreDelServicio = 'Luz';
            saldoParaAbonarServicios(pagarLuz);        
            break;

        case 4:        
            nombreDelServicio = 'Internet';
            saldoParaAbonarServicios(pagarInternet);    
            break;

        default:
            alert('El servicio que elegiste no existe');
            break;
    }
}

function transferirDinero() {
    montoTransferir = parseInt(prompt('Ingrese el Monto a Transferir'));
    if (montosNoValidos(montoTransferir) == true || (montoTransferir < saldoCuenta)){   
        var cuentaElegida = parseInt(prompt('Ingrese el N° de la cuenta donde quiere transferir el dinero:\n N° Cuenta: 12345 \n N° Cuenta: 54321'));
        switch (cuentaElegida){
            case 12345:
                saldoCuenta = parseInt(restarDinero(montoTransferir));
                actualizarSaldoEnPantalla(saldoCuenta);
                alert('Se han transferido: $' + montoTransferir + '\nCuenta destino: $' + cuentaElegida);
            break;            
            case 54321:
                saldoCuenta = parseInt(restarDinero(montoTransferir));
                actualizarSaldoEnPantalla(saldoCuenta);
                alert('Se han transferido: $' + montoTransferir + '\nCuenta destino: $' + cuentaElegida);
            break;
            default:
                alert('La cuenta N° '+ cuentaElegida +' no existe');
            break;
        }
    }
}

function iniciarSesion() {
    claveUsuario = parseInt(prompt('Ingrese su clave para poder acceder a su HomeBanking'));
    if (claveUsuario !== 25192) {
        alert('Detectamos que la clave es incorrecta. Por seguridad tu cuenta se ha retenido')
        saldoCuenta = 0;
        limiteExtraccion = 0;
        nombreUsuario = 'Contraseña Incorrecta';
        actualizarSaldoEnPantalla(saldoCuenta);
        actualizarLimiteEnPantalla(limiteExtraccion);
    } else {
        alert('Bienvenidx ' + nombreUsuario + ' ya puedes comenzar a realizar operaciones');   
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}