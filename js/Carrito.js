export let Carrito = []

export const add_Product = async (prodExist, opcion_Producto, producto_Elegido, unidades) => {
    if (prodExist != '') {
        //Se evalua si en el carrito ya existe el producto, en caso afirmativo se modifica el precio y su cantidad                        
        for (let i = 0; i < Carrito.length; i++) {
            if (Carrito[i].Id === opcion_Producto) {
                Carrito[i].Precio = Carrito[i].Precio + ((producto_Elegido.Precio) * unidades)
                Carrito[i].Cantidad = Carrito[i].Cantidad + unidades
                alert("El producto ha sido agregado a su carrito")
            }
        }
        return true
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
        return true
    }
}


export const delete_Product = async (numero_ProdABorrar, prod_aBorrar, info_Prod) => {
    if (prod_aBorrar != '') {
        let cantidad_ABorrar = (Number(prompt("El producto a borrar es:" + '\n' + info_Prod.Nombre + '\n' + '\n' + "Indique la cantidad de producto a borrar:")))
        if (cantidad_ABorrar >= 1 && !isNaN(cantidad_ABorrar)) {
            for (let i = 0; i < Carrito.length; i++) {
                if (Carrito[i].Id === numero_ProdABorrar) {
                    Carrito[i].Precio = Carrito[i].Precio - ((info_Prod.Precio) * cantidad_ABorrar)
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
                        alert("Se han eliminado" + ' ' + cantidad_ABorrar + ' ' + info_Prod.Nombre)
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
        return true
    } else {
        alert("El numero de producto seleccionado no existe")
        return true
    } 
}

