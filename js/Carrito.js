const carritoBtn = document.querySelector('.carritoCompras')
const verCarrito = document.querySelector('.carritoProductos')
const templateCarrito = document.getElementById('template-carrito').content
const items = document.getElementById('items')
const templateFooter = document.getElementById('template-footer').content
const footer = document.getElementById('footerCarrito')
const fragment = document.createDocumentFragment()
const divisa = "$"
const carritoUrl = 'img/shopping-cart-solid.svg';
let carrito = []


document.addEventListener('DOMContentLoaded', () => {
    try {
        ProductosCarrito()
    } catch (err) {
        console.error("no se pudo cargar el elemento", err)
    }
})

// Funcion que permite agregar productos al carrito. En caso que el producto exista, se modifica la cantidad y el precio total de ese producto cargado//
//Los productos son guardados en el seassionStorage.
export const add_Product = async (producto, e) => {
    try {
        if (!sessionStorage.getItem(e.target.dataset.id)) {
            const productoNuevo = {
                id: e.target.dataset.id,
                Nombre: producto.querySelector('h5').textContent,
                Descripcion: producto.querySelector('#descripcionProducto').textContent,
                Precio: Number((producto.querySelector('#precioProducto').textContent).slice(1)),
                Foto: producto.querySelector('#fotoProducto').getAttribute('src'),
                Cantidad: 1
            }
            sessionStorage.setItem(producto.querySelector('[name="btnComprar"]').dataset.id, JSON.stringify(productoNuevo))
            ProductosCarrito()
        } else {
            let dataStorage = JSON.parse(sessionStorage.getItem(e.target.dataset.id));
            dataStorage.Cantidad = dataStorage.Cantidad + 1;
            dataStorage.Precio = Number(dataStorage.Precio) + Number((producto.querySelector('#precioProducto').textContent).slice(1))
            sessionStorage.setItem(e.target.dataset.id, JSON.stringify(dataStorage));
            ProductosCarrito()
        }
    } catch (err) {
        console.error("Ups! algo ha salido mal y el producto no se cargo al documento", err)
    }
}

//Evento para cambiar la propiedad CSS del carrito. Esto permite desplegar la lista de productos en carrito
carritoBtn.addEventListener('click', () => {
    try {
        verCarrito.classList.toggle('show');
        ProductosCarrito()
    } catch (err) {
        console.error("Ups! algo ha salido mal. La propiedad CSS no ha sido modificada",err)
    }
})

//Recorre el seassionStorage y agregar los productos (los cuales son objetos) al array carrito
const ProductosCarrito = () => {
    try {
        carrito.length = 0
        for (let i = 0; i < sessionStorage.length; i++) {
            let key = sessionStorage.key(i)
            typeof JSON.parse(sessionStorage.getItem(key)) == 'object' && carrito.push(JSON.parse(sessionStorage.getItem(key)))
        }
        renderCarrito()
    } catch (err) {
        console.error("Algo no salio como se esperaba",err)
    }
}

// Renderiza los productos en el array carrito, permitiendo dibujar los productos en el listado de carrito.
const renderCarrito = () => {
    items.innerHTML = ''
    try {
        carrito.forEach(producto => {
            //Al recorrer el carrito, primero corrobora que la cantidad del producto es igual o mayor que 1. En caso afirmativo, renderiza el producto. Caso contrario elimina el objeto del seassionStorage
            if (producto.Cantidad >= 1) {
                templateCarrito.querySelectorAll('td')[0].textContent = producto.Nombre
                templateCarrito.querySelectorAll('td')[1].textContent = producto.Descripcion
                templateCarrito.querySelector('img').setAttribute('src', producto.Foto);
                templateCarrito.querySelectorAll('td')[2].textContent = producto.Cantidad
                templateCarrito.querySelector('.btn-info').dataset.id = producto.id
                templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
                templateCarrito.querySelectorAll('td')[4].textContent = `${divisa}` + producto.Precio
                let cloneCarrito = templateCarrito.cloneNode(true);
                fragment.appendChild(cloneCarrito)
            }
        });
        items.appendChild(fragment)
        calcularCostoTotal()
    } catch (err) {
        console.error("El carrito no se ha logrado renderizar correctamente", err)
    }
}


//Calcula el costo y cantidad de productos en carrito y lo dibuja al final del listado de carrito.
const calcularCostoTotal = async () => {
    try {
        footer.innerHTML = ''
        carrito.length === 0 && (footer.innerHTML = `<th scope="row" colspan="5">Carrito Vacio</th>`)

        //Creamos los contadores de precio y cantidad que seran utilizados en el footer del carrito
        let nCantidad = carrito.reduce((acc, { Cantidad }) => acc + Cantidad, 0)
        let nPrecio = carrito.reduce((acc, { Precio }) => acc + (Precio), 0)

        //Aprovecho la creacion del acumulador de cantidad de productos en carrito, para crear un indice sobre el carrito que señale la cantidad de productos dentro del mismo.
        nCantidad > 0 ? ((document.getElementById("contador").textContent = nCantidad) & (document.getElementById("contador").style.display = 'flex')) : ((document.getElementById("contador").textContent = '') & (document.getElementById("contador").style.display = 'none'))
        //Agregamos los valores al footer del carrito
        templateFooter.querySelectorAll('td')[1].textContent = nCantidad
        templateFooter.querySelector('span').textContent = nPrecio
        const cloneFooter = templateFooter.cloneNode(true)
        fragment.appendChild(cloneFooter)
        footer.appendChild(fragment)

        //Esta parte de la funcion, habilita el boton "Vaciar carrito". Elimina el storage y renderiza el carrito.
        const botonVaciar = document.querySelector('#vaciar-carrito')
        botonVaciar.addEventListener('click', async () => {
            Swal.fire({
                title: "Esta seguro que desea borrar todos los productos del carrito?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, estoy seguro",
                cancelButtonText: "No, no quiero borrarlos"
            }).then((result) => {
                if(result.isConfirmed){
                    Swal.fire({
                        title: "Productos eliminados",
                        icon: "success",
                        text: "Los productos de su carrito han sido eliminados"
                    })
                    sessionStorage.clear()
                    ProductosCarrito()
                }
            })
        })
    } catch (err) {
        console.error(err)
    }
}

items.addEventListener('click', e => {
    try {
        //Aumenta la cantidad de productos en el carrito
        if (e.target.classList.contains('btn-info')) {
            let productoSumar = JSON.parse(sessionStorage.getItem(e.target.dataset.id));
            const precio = (productoSumar.Precio / productoSumar.Cantidad)
            productoSumar.Cantidad++
            productoSumar.Precio = precio * productoSumar.Cantidad
            sessionStorage.setItem(e.target.dataset.id, JSON.stringify(productoSumar));
            ProductosCarrito()
            //Disminuye la cantidad de productos en el carrito
        } if (e.target.classList.contains('btn-danger')) {
            let productoSumar = JSON.parse(sessionStorage.getItem(e.target.dataset.id));
            const precio = (productoSumar.Precio / productoSumar.Cantidad)
            productoSumar.Cantidad--
            productoSumar.Precio = precio * productoSumar.Cantidad
            sessionStorage.setItem(e.target.dataset.id, JSON.stringify(productoSumar));

            //Si la cantidad del producto en carrito queda en 0, se elimina del storage
            productoSumar.Cantidad < 1 && sessionStorage.removeItem(e.target.dataset.id)
            ProductosCarrito()
        }
        e.stopPropagation()
    } catch (err) {
        console.error("Las acciones del carrito no se han logrado completar", err)
    }
})

//Funcion que detecta el evento "click" y cambia una clase en la SVG carrito. Esto permite la animacion del carrito
$('.carritoCompras').on('click', 'svg', (e) => {
    $('#carrito').toggleClass('abierto')
    e.stopPropagation();
});

// Funcion que invoca el SVG del carrito
$(function () {
    $.get(carritoUrl, null,
        function (data) {
            $('svg', data).prependTo(carritoBtn);
        },
    );
});




