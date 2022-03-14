let Carrito = []
const divisa = "$"

const productos = [
    {
        Id: 1,
        Nombre: "Muñeco Daruma",
        Descripcion: "Muñeco de la fortuna Daruma",
        Precio: 150
    },
    {
        Id: 2,
        Nombre: "Mikado - (Palitos Chinos)",
        Descripcion: "Juego de palitos chinos",
        Precio: 300
    },
    {
        Id: 3,
        Nombre: "Maneki-Neko - Muñeco de la fortuna",
        Descripcion: "Adorno gato de la fortuna japones",
        Precio: 500
    },
    {
        Id: 4,
        Nombre: "Ramen Kimchi",
        Descripcion: "Ramen importado marca Kimchi",
        Precio: 600
    }
]


const opciones_Compra = {
    opcion_Compra1: "1. Comprar Producto",
    opcion_Compra2: "2. No comprar producto - Volver al menu de productos"
}

const opciones_Carrito = {
    opcion_Carrito1: "1. finalizar compra",
    opcion_Carrito2: "2. Borrar producto de carrito",
    opcion_Carrito3: "3. Volver al menu principal"
}

const opciones_MenuPrincipal = {
    opcion_Principal1: "1. Comprar productos",
    opcion_Principal2: "2. Ver mi carrito de productos",
    opcion_Principal3: "3. Cancelar y salir del programa de compra"
}

// Se mapea el array de productos y se crea un nuevo array con la informacion necesaria para mostrar en la lista de productos
let prod = productos.map((producto) => {
    return producto.Id + "." + producto.Nombre + ' -- ' + "Precio:" + ' ' + divisa + producto.Precio
})

//Funcion para calcular el precio de un producto con IVA

const iva = (valor) => {
    return valor * 0.21 + valor
}
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
                // Cuando veo los productos en Carrito tengo 2 opciones. O comprarlo o bien volver al menu anterior sin comprarlo.
                if (opcion_Compra === 1) {
                    let unidades = Number(prompt("Cuantas unidades desea comprar"))
                    let prod_nuevo = Carrito.filter(producto => producto.Id === opcion_Producto)
                    if (prod_nuevo != '') {
                        //Se evalua si en el carrito ya existe el producto, en caso afirmativo se modifica el precio y su cantidad                        
                        for (let i = 0; i < Carrito.length; i++) {
                            if (Carrito[i].Id === opcion_Producto) {
                                Carrito[i].Precio = Carrito[i].Precio + ((producto_Elegido.Precio) * unidades)
                                Carrito[i].Cantidad = Carrito[i].Cantidad + unidades
                                alert("El producto ha sido agregado a su carrito")
                            }
                        }
                        break
                    } else {
                        // En caso que en el carrito no exista el producto, se agrega.
                        let producto_nuevo = {
                            Id: producto_Elegido.Id,
                            Nombre: producto_Elegido.Nombre,
                            Descripcion: producto_Elegido.Descripcion,
                            Precio: (producto_Elegido.Precio) * unidades,
                            Cantidad: unidades
                        }
                        Carrito.push(producto_nuevo)
                        alert("El producto ha sido agregado a su carrito")
                        break
                    }
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
            alert("Los productos de su carrito son:" + '\n' + '\n' + carrito_Compras.join(''))
            let opcion_Carrito = prompt("Que acción desea realizar?" + '\n' + opciones_Carrito.opcion_Carrito1 + '\n' + opciones_Carrito.opcion_Carrito2 + '\n' + opciones_Carrito.opcion_Carrito3)
            if (Number(opcion_Carrito) === 1) {
                alert("La compra ha finalizado" + '\n' + "El costo total de los productos es:" + " " + divisa + iva(total_ConIva))
                break
                //Como opcion tambien podemos borrar productos de nuestro Carrito
            } else if (Number(opcion_Carrito) === 2) {
                let numero_ProdABorrar = Number(prompt("Indique el Id  de carrito del producto a borrar"))
                let prod_aBorrar = Carrito.find(producto => producto.Id === numero_ProdABorrar)
                console.log(prod_aBorrar.Nombre)
                // Se evalua si el producto existe en el carrito, en caso de existir, tener unidades y que la cantidad a eliminar sea un numero, se proceder a modificar la cantidad y precio del producto
                if (prod_aBorrar != '') {
                    let cantidad_ABorrar = (Number(prompt("El producto a borrar es:" + '\n' + prod_aBorrar.Nombre + '\n' + '\n' + "Indique la cantidad de producto a borrar:")))
                    if (cantidad_ABorrar >= 1 && !isNaN(cantidad_ABorrar)) {
                        for (let i = 0; i < Carrito.length; i++) {
                            if (Carrito[i].Id === numero_ProdABorrar) {
                                Carrito[i].Precio = Carrito[i].Precio - ((prod_aBorrar.Precio) * cantidad_ABorrar)
                                Carrito[i].Cantidad = Carrito[i].Cantidad - cantidad_ABorrar
                            }
                        }                        
                    } else {
                        // Si no cumple con lo anterior, no se modifica
                        alert("es imposible borrar la cantidad seleccionada")
                    }
                    // Luego de borrar o modificar las cantidades se evalua si el producto ha quedado con 0 unidades o aun posee. En caso de quedar con  0 unidades se borra del carrito
                    if (cantidad_ABorrar >= 1 && !isNaN(cantidad_ABorrar)) {
                        for (let i = 0; i < Carrito.length; i++) {
                            if (Carrito[i].Id === numero_ProdABorrar) {
                                if (Carrito[i].Cantidad >= 1) {
                                    alert("Se han eliminado" + ' ' + cantidad_ABorrar + ' ' + prod_aBorrar.Nombre)
                                } else {
                                    Carrito.splice(i, 1)
                                    alert("Se ha eliminado del producto de su carrito")
                                }
                                break
                            }
                        }
                    } else {
                        // Si no cumple con lo anterior, no se modifica
                        alert("es imposible borrar la cantidad seleccionada")
                    }
                } else {
                    alert("El numero de producto seleccionado no existe")
                    continue
                }                
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


