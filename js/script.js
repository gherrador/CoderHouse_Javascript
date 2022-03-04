const nombre_Apellido = prompt("Ingrese su nombre")

const opciones = {
    opcion1: "1. Salir del programa",
    opcion2: "2. Calcular el iva de un producto",
    opcion3: "3. Calcular el costo total de un producto con iva"
}

const saludo = (nombre) => {    
    alert("Bienvenido" + " " + nombre)
}
saludo(nombre_Apellido)

const iva = (valor) => {
    return valor*0.21
}

const precio_Total = (precio) => {
    return (precio*0.21 + precio)
}

let opcion = Number(prompt("Que operacion desea realizar?" + ' ' + '\n' + "Elija una opcion (Colocar el numero 1, 2 o 3):" + "\n" + opciones.opcion1 + "\n" + opciones.opcion2 + "\n" + opciones.opcion3))

while (true) {
    if (opcion == '' || isNaN(opcion) || opcion == null) {
        alert("no se ha ingresado una opcion correcta")
        opcion = Number(prompt("Que operacion desea realizar?" + ' ' + '\n' + "Elija una opcion (Colocar el numero 1, 2 o 3):" + "\n" + opciones.opcion1 + "\n" + opciones.opcion2 + "\n" + opciones.opcion3))
        continue
    }else if(opcion === 2) {
        const valor = Number(prompt("Ingrese el valor del producto a calcular el IVA"))        
        alert("El iva del producto es:" + ' ' + iva(valor))
        opcion = Number(prompt("Que operacion desea realizar?" + ' ' + '\n' + "Elija una opcion (Colocar el numero 1, 2 o 3):" + "\n" + opciones.opcion1 + "\n" + opciones.opcion2 + "\n" + opciones.opcion3))
    }else if(opcion == 1) {
        alert("El loop a finalizado")
        break        
    }else{
        const precio = Number(prompt("Ingrese el valor del producto a calcular el IVA"))             
        alert("El precio total del producto es:" + ' ' + precio_Total(precio))
        opcion = Number(prompt("Que operacion desea realizar?" + ' ' + '\n' + "Elija una opcion (Colocar el numero 1, 2 o 3):" + "\n" + opciones.opcion1 + "\n" + opciones.opcion2 + "\n" + opciones.opcion3))
        continue
    }
}


