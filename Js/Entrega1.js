alert("Vamos a aprender las tablas de multiplicar mayores a 0")
let primerNumero = Number(prompt("Ingresar un primer numero a multiplicar"));


if(primerNumero === 0){
    alert("Usted ha ingresado el numero 0. Todos los numeros multiplicados por 0 da como resultado 0 (cero)")
}
while (primerNumero != 0) { 
    if (isNaN(primerNumero) === true) {
        alert("Usted no ha ingresado un numero. Por favor ingresar un numero mayor a 0")
    }else {
        let segundoNumero = Number(prompt("Ingresar el número hasta donde queremos extender nuestra tabla de multiplicar"))
        for (i = 1; i <= segundoNumero; i++)
            console.log(primerNumero + "x" + i + "=" + (primerNumero * i))
        let respuesta = prompt("Desea obtener otra tabla de multiplicar?(Ingrese Si para continuar)")
        if (String(respuesta.toLowerCase()) === "si") {
            primerNumero = Number(prompt("Ingresar un primer numero a multiplicar"))
        } else {
            alert("la serie ha finalizado")
            break
        }
    }
    primerNumero = Number(prompt("Ingresar un primer numero a multiplicar"));
}


