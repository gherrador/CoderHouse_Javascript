import { loadProducts } from './Productos.js'

let Carrito = []

export const add_Product = async (evento) => {
    let Id = Number(evento.target.getAttribute('id'))
    const data = await loadProducts()
    let producto_Elegido = data.find((producto) => producto.Id === Id) 
    if(Carrito.find((producto) => producto.Id === Id)  === undefined){
        let producto_nuevo = {
            Id: producto_Elegido.Id,
            Nombre: producto_Elegido.Nombre,
            Descripcion: producto_Elegido.Descripcion,
            Precio: producto_Elegido.Precio,
            Foto: producto_Elegido.Foto,
            Categoria: producto_Elegido.Categoria,
            Cantidad: 1
        }
        Carrito.push(producto_nuevo)
        return true
    }  else{
        for (let i = 0; i < Carrito.length; i++) {
            if (Carrito[i].Id === producto_Elegido.Id) {
                Carrito[i].Precio = Carrito[i].Precio + producto_Elegido.Precio
                Carrito[i].Cantidad = Number(Carrito[i].Cantidad) + 1
            }
        }
        console.log(Carrito)
        return true
    } 
}
