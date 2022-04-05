const fragment = document.createDocumentFragment()

const divisa = "$"
const carritoUrl = 'img/shopping-cart-solid.svg';
let carrito = []

$(document).ready(() => {
    try {
        ProductosCarrito()
    } catch (err) {
        console.error("no se pudo cargar el elemento", err)
    }
})
// Funcion que permite agregar productos al carrito. En caso que el producto exista, se modifica la cantidad y el precio total de ese producto cargado//
//Los productos son guardados en el seassionStorage.
export const add_Product = async (producto) => {
    try {
        if (!sessionStorage.getItem($(producto).find('#mybtn').attr('data-id'))) {
            const productoNuevo = {
                Id: $(producto).find('#mybtn').attr('data-id'),
                Nombre: $(producto).find('#tituloProducto').text(),
                Descripcion: $(producto).find('#descripcionProducto').text(),
                Precio: Number(($(producto).find('#precioProducto').text()).slice(1)),
                Foto: $(producto).find('#fotoProducto').prop('src'),
                Cantidad: 1
            }
            sessionStorage.setItem($(producto).find('#mybtn').attr('data-id'), JSON.stringify(productoNuevo))
            ProductosCarrito()
        } else {
            let dataStorage = JSON.parse(sessionStorage.getItem($(producto).find('#mybtn').attr('data-id')));
            $(dataStorage).attr('Cantidad', $(dataStorage).attr('Cantidad') + 1)
            $(dataStorage).attr('Precio', Number($(dataStorage).attr('Precio')) + Number(($(producto).find('#precioProducto').text()).slice(1)))
            sessionStorage.setItem($(producto).find('#mybtn').attr('data-id'), JSON.stringify(dataStorage));
            ProductosCarrito()
        }
    } catch (err) {
        console.error("Ups! algo ha salido mal y el producto no se cargo al documento", err)
    }
}


//Funcion que detecta el evento "click" y cambia una clase en la SVG carrito. Esto permite la animacion del carrito
$('.carritoCompras').on('click', 'svg', (e) => {
    try {
        $('#carrito').toggleClass('abierto')
        e.stopPropagation();
    } catch {
        console.error("Ups! algo ha salido mal. La propiedad CSS no ha sido modificada", err)
    }
});

//Evento para cambiar la propiedad CSS del carrito. Esto permite desplegar la lista de productos en carrito//
//Tambien activa los botones del carrito, cuando la lista se encuentra abierta//
$('.carritoCompras').on('click', 'svg', (e) => {
    try {
        $('.carritoProductos').toggleClass('show')        
        ProductosCarrito()
    } catch (err) {
        console.error("Ups! algo ha salido mal. La propiedad CSS no ha sido modificada", err)
    }
})

// Funcion que invoca el SVG del carrito
$(() => {
    $.get(carritoUrl,
        function (data) {
            $('svg', data).prependTo('.carritoCompras');
        },
    );
});


//Recorre el seassionStorage y agregar los productos (son objetos) al array carrito
const ProductosCarrito = () => {
    try {
        carrito.length = 0
        for (let i = 0; i < sessionStorage.length; i++) {
            let key = sessionStorage.key(i)
            typeof JSON.parse(sessionStorage.getItem(key)) == 'object' && carrito.push(JSON.parse(sessionStorage.getItem(key)))
        }
        renderCarrito()
    } catch (err) {
        console.error("Algo no salio como se esperaba", err)
    }
}

// Renderiza los productos en el array carrito, permitiendo dibujar los productos en el listado de carrito.
const renderCarrito = () => {
    $('#items').html('')
    try {
        $.each(carrito, (index, producto) => {
            //Al recorrer el carrito, primero corrobora que la cantidad del producto es igual o mayor que 1. En caso afirmativo, renderiza el producto. Caso contrario elimina el objeto del seassionStorage
            if ($(producto).attr('Cantidad') >= 1) {
                $('#template-carrito').contents().find('#carrito-nombre').text(producto.Nombre)
                $('#template-carrito').contents().find('#carrito-descripcion').text(producto.Descripcion)
                $('#template-carrito').contents().find('#fotoProductoCarrito').attr('src', producto.Foto)
                $('#template-carrito').contents().find('#carrito-cantidad').text(producto.Cantidad)
                $('#template-carrito').contents().find('.btn-info').attr('data-id', producto.Id)
                $('#template-carrito').contents().find('.btn-danger').attr('data-id', producto.Id)
                $('#template-carrito').contents().find('#carrito-precio').text(`${divisa}` + producto.Precio)
                const cloneCarrito = $('#template-carrito').contents().clone();
                $(fragment).append(cloneCarrito)
            }
        });
        $('#items').append(fragment)
        calcularCostoTotal()
    } catch (err) {
        console.error("El carrito no se ha logrado renderizar correctamente", err)
    }
}

//Calcula el costo y cantidad de productos en carrito y lo dibuja al final del listado de carrito.//
// Tambien dibuja los botones de "Finalizar Compra" y "Vaciar Carrito" en caso que existan productos en carrito//
const calcularCostoTotal = async () => {
    try {
        if (carrito.length === 0) {
            $('#footerCarrito').html('')
            $('#footerCarrito').html('`<th scope="row"  id="carritoVacio" colspan="6">Carrito Vacio</th>`')
            $('.contador').css('display', 'none')
            $("#btn-acciones-carrito").html('')
        } else {        
            accionCarrito()
            $('#footerCarrito').html('')
            //Creamos los contadores de precio y cantidad que seran utilizados en el footer del carrito
            let nCantidad = carrito.reduce((acc, { Cantidad }) => acc + Cantidad, 0)
            let nPrecio = carrito.reduce((acc, { Precio }) => acc + (Precio), 0)

            //Aprovecho la creacion del acumulador de cantidad de productos en carrito,// 
            //para crear un indice sobre el carrito que señale la cantidad de productos//
            // dentro del mismo.//
            $('.contador').text(nCantidad).css('display', 'flex')

            //Agregamos los valores al footer del carrito
            console.log($('#template-footer').contents().find('.cantidad'))
            $('#template-footer').contents().find('.cantidad').text(nCantidad)
            $('#template-footer').contents().find('.precio').text(`$${nPrecio}`)
            const cloneFooter = $('#template-footer').contents().clone();
            $('#footerCarrito').append(cloneFooter)
        }
    } catch (err) {
        console.error(err)
    }
}

$('#items').click(e => {
    try {
        //Aumenta la cantidad de productos en el carrito
        if ($(e.target).attr('id') === 'btn-sumar') {
            let productoSumar = JSON.parse(sessionStorage.getItem($(e.target).attr('data-id')))
            const precio = ($(productoSumar).attr('Precio') / ($(productoSumar).attr('Cantidad')))
            $(productoSumar).attr('Cantidad', $(productoSumar).attr('Cantidad') + 1)
            $(productoSumar).attr('Precio', precio * $(productoSumar).attr('Cantidad'))
            sessionStorage.setItem($(e.target).attr('data-id'), JSON.stringify(productoSumar));
            ProductosCarrito()

            //Disminuye la cantidad de productos en el carrito
        } if ($(e.target).attr('id') === 'btn-restar') {
            let productoSumar = JSON.parse(sessionStorage.getItem($(e.target).attr('data-id')))
            const precio = ($(productoSumar).attr('Precio') / ($(productoSumar).attr('Cantidad')))
            $(productoSumar).attr('Cantidad', $(productoSumar).attr('Cantidad') - 1)
            $(productoSumar).attr('Precio', precio * $(productoSumar).attr('Cantidad'))
            sessionStorage.setItem($(e.target).attr('data-id'), JSON.stringify(productoSumar));
            //Si la cantidad del producto en carrito queda en 0, se elimina del storage
            $(productoSumar).attr('Cantidad') < 1 && sessionStorage.removeItem($(e.target).attr('data-id'))
            ProductosCarrito()
        }
        e.stopPropagation()
    } catch {
        console.error('Los botones no estan funcionando correctamente')
    }
})

//Funcion que dibuja los botones de accion de "Finalizar Compra" y "Vaciar Carrito"
//Tambien les otorga accion que vacia el carrito o finaliza la compra y redirige a la pagina finalizarCompra
const accionCarrito = () => {
    $("#btn-acciones-carrito").html('')
    const cloneFooter = $('#template-ordenes').contents().clone();
    $("#btn-acciones-carrito").append(cloneFooter)
    $("#vaciar-carrito").on('click', () => {
        Swal.fire({
            title: "Esta seguro que desea borrar todos los productos del carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, estoy seguro",
            cancelButtonText: "No, no quiero borrarlos",
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Productos eliminados",
                    icon: "success",
                    text: "Los productos de su carrito han sido eliminados",
                    showConfirmButton: true,
                    allowOutsideClick: false
                })
                sessionStorage.clear()
                ProductosCarrito()
            }
        })
    })
    $('#finalizar-compra').on('click', (e) => {
        Swal.fire({
            title: "Esta seguro que desea finalizar su compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, estoy seguro",
            cancelButtonText: "No, no quiero seguir comprando",
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Finalizando Compra",
                    icon: "success",
                    text: "Esta siendo redirigido a un sitio más seguro para finalizar su compra",
                    showConfirmButton: false,
                    allowOutsideClick: false
                })
                setTimeout(() => {
                    $(location).attr('href', '../html/finalizarCompra.html')
                }, 4000)
            }
        })
    })
}










