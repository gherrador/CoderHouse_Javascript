import { Carrito ,add_Product, delete_Product} from './Carrito.js'
import { productos } from './Productos.js'
import {opciones_Compra, opciones_Carrito, opciones_MenuPrincipal} from './Opciones.js'

const divisa = "$"


// Se mapea el array de productos y se crea un nuevo array con la informacion necesaria para mostrar en la lista de productos
let prod = productos.map((producto) => {
    return producto.Id + "." + producto.Nombre + ' -- ' + "Precio:" + ' ' + divisa + producto.Precio
})

//Funcion para calcular el precio de un producto con IVA

const iva = (valor) => {
    return valor * 0.21 + valor
}
// Funcion para agregar un producto - Cuando veo los productos en Carrito tengo 2 opciones. O comprarlo o bien volver al menu anterior sin comprarlo.

// Se da la bienvenida a la pagina
alert("Bienvenido a nuestra tienda japonesa!")

//Opcion del menu principal
let opcion_Principal = prompt("Que accion desea realizar?" + '\n' + opciones_MenuPrincipal.opcion_Principal1 + '\n' + opciones_MenuPrincipal.opcion_Principal2 + '\n' + opciones_MenuPrincipal.opcion_Principal3)

// Se presenta la lista de productos al usuario con los productos disponibles para la venta. Es posible volver al menu principal colocando la palabra volver

//Se da inicio al ciclo de compra

while (true) {
    if (Number(opcion_Principal) === 1) {
        let opcion_Producto = Number(prompt("Los productos que tenemos actualmente a la venta son:" + '\n' + prod.join('' + '\n') + '\n' + '\n' + "Para comprar un producto seleccione el numero del producto." + '\n' + "Para volver al menu principal coloque 0"))
        // Se presenta la lista de productos al usuario con los productos disponibles para la venta. Es posible volver al menu principal colocando la palabra volver
        if (opcion_Producto === '' || isNaN(opcion_Producto)) {
            alert("no se ha ingresado una opcion incorrecta")
            continue
            //Si es igual a 0, se regresa al menu principal
        } else if (Number(opcion_Producto) === 0) {
            opcion_Principal = prompt("1. Comprar productos" + '\n' + "2. Ver mi carrito de productos" + '\n' + "3. Cancelar y salir del programa de compra")
        } else if (opcion_Producto >= 1 && opcion_Producto <= productos.length) {
            let producto_Elegido = productos.find((producto) => producto.Id === opcion_Producto)
            let opcion_Compra = Number(prompt("El producto que usted selecciono es:" + '\n' + "Nombre:" + " " + producto_Elegido.Nombre + '\n' + "Descripcion:" + " " + producto_Elegido.Descripcion + '\n' + "Desea comprar este producto?" + '\n' + opciones_Compra.opcion_Compra1 + '\n' + opciones_Compra.opcion_Compra2 + '\n' + "Seleccione 1 o 2"))
            while (true) {
                if (opcion_Compra === 1) {
                    let unidades = Number(prompt("Cuantas unidades desea comprar"))
                    let prod_nuevo = Carrito.filter(producto => producto.Id === opcion_Producto)
                    // Se invoca la funcion para agregar un producto
                    await add_Product(prod_nuevo,opcion_Producto,producto_Elegido,unidades)
                    break
                } else if (opcion_Compra === 2) {
                    break
                } else {
                    alert("Usted no ha elegido una opcion correcta")
                    break
                }
            }
            // Si el indice de producto ingresado no existe, nos alertara esta situacion.
        } else {
            alert("El producto seleccionado no existe")
            continue
        }
        // La segunda opcion principal es para ver nuestro carrito. Aqui tendremos la opcion de borrar productos, finalizar compra o regresar al menu principal
    } else if (Number(opcion_Principal) === 2) {
        if (Carrito.length === 0) {
            // Si no hay productos en el carrito, nos avisara de esto  
            opcion_Principal = prompt("Su carrito no posee productos." + '\n' + '\n' + "1. Comprar productos" + '\n' + "2. Ver mi carrito de productos" + '\n' + "3. Cancelar y salir del programa de compra")
            continue
        } else {
            let carrito_Compras = Carrito.map((producto => {
                return producto.Cantidad + "x" + producto.Nombre + ' -- ' + "Precio:" + ' ' + divisa + producto.Precio +" "+' -- '+ "Id de carrito:" + " " + producto.Id  + '\n'
            }))
            // El precio total de los productos en carrito se calculo con IVA
            let total_ConIva = Carrito.reduce((acc, producto) => acc + Number(producto.Precio), 0)
            let opcion_Carrito = prompt("Los productos de su carrito son:" + '\n' + '\n' + carrito_Compras.join('')+ '\n' +  '\n' + "Que acción desea realizar?" + '\n' + opciones_Carrito.opcion_Carrito1 + '\n' + opciones_Carrito.opcion_Carrito2 + '\n' + opciones_Carrito.opcion_Carrito3)
            if (Number(opcion_Carrito) === 1) {
                alert("La compra ha finalizado" + '\n' + "El costo total de los productos es:" + " " + divisa + iva(total_ConIva))
                break
                //Como opcion tambien podemos borrar productos de nuestro Carrito
            } else if (Number(opcion_Carrito) === 2) {
                let numero_ProdABorrar = Number(prompt("Indique el Id  de carrito del producto a borrar"))
                let prod_aBorrar = Carrito.filter(producto => producto.Id === numero_ProdABorrar)
                let info_Prod = productos.find(producto => producto.Id === numero_ProdABorrar)
                // Se invoca funcion para borrar producto
                await delete_Product(numero_ProdABorrar, prod_aBorrar, info_Prod)                               
            } else if (Number(opcion_Carrito) === 3) {
                opcion_Principal = prompt("Que accion desea realizar?" + '\n' + "1. Comprar productos" + '\n' + "2. Ver mi carrito de productos" + '\n' + "3. Cancelar y salir del programa de compra")
                continue
            }
        }
        // Es posible cancelar la compra de productos y salir del programa sin realizar modificaciones o compras
    } else if (Number(opcion_Principal) === 3) {
        alert("La compra ha sido cancelada. El programa ha finalizado")
        break

        //Por ultimo cuando no se ingresa una opcion principal correcta, nos alertara de esta situacion y nos solicitara nuevamente una opcion.
    } else {
        alert("No se ha ingresado ninguna opcion")
        opcion_Principal = prompt("Que accion desea realizar?" + '\n' + opciones_MenuPrincipal.opcion_Principal1 + '\n' + opciones_MenuPrincipal.opcion_Principal2 + '\n' + opciones_MenuPrincipal.opcion_Principal3)
    }
}


