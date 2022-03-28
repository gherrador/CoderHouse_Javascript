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

// Funcion que permite agregar productos al carrito. En caso que el producto exista, se modifica la cantidad y el precio total de ese producto cargado//
//Los productos son guardados en el seassionStorage.
export const add_Product = async (producto, e) => {
    if (!sessionStorage.getItem('contador')) {
        sessionStorage.setItem('contador', 1)
    } else {
        let contador = Number(sessionStorage.getItem('contador')) + 1
        sessionStorage.setItem('contador', contador)
    }
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
}


//Evento para cambiar la propiedad CSS del carrito. Esto permite desplegar la lista de productos en carrito
carritoBtn.addEventListener('click', () => {
    verCarrito.classList.toggle('show');
    ProductosCarrito()
})

//Recorre el seassionStorage y agregar los productos (los cuales son objetos) al array carrito
const ProductosCarrito = () => {
    carrito.length = 0
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i)
        if (typeof JSON.parse(sessionStorage.getItem(key)) == 'object') {
            carrito.push(JSON.parse(sessionStorage.getItem(key)))
        }
    }
    renderCarrito()
}
// Renderiza los productos en el array carrito, permitiendo dibujar los productos en el listado de carrito.
const renderCarrito = () => {
    items.innerHTML = ''
    carrito.forEach(producto => {
        templateCarrito.querySelectorAll('td')[0].textContent = producto.Nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.Descripcion
        templateCarrito.querySelector('img').setAttribute('src', producto.Foto);
        templateCarrito.querySelectorAll('td')[2].textContent = producto.Cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelectorAll('td')[4].textContent = `${divisa}` + producto.Precio
        let cloneCarrito = templateCarrito.cloneNode(true);
        fragment.appendChild(cloneCarrito)
    });
    items.appendChild(fragment)
    calcularCostoTotal()
}


//Calcula el costo y cantidad de productos en carrito y lo dibuja al final del listado de carrito.
const calcularCostoTotal = async() => {
    footer.innerHTML = ''
    if(carrito.length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito Vacio</th>
        `
    }
    const nCantidad = carrito.reduce((acc, {Cantidad}) => acc + Cantidad , 0)
    const nPrecio = carrito.reduce((acc, {Precio}) => acc + (Precio), 0)
    templateFooter.querySelectorAll('td')[1].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const cloneFooter = templateFooter.cloneNode(true)
    fragment.appendChild(cloneFooter)
    footer.appendChild(fragment)

    //Esta parte de la funcion, habilita el boton "Vaciar carrito". Elimina el storage y renderiza el carrito.
    const botonVaciar = document.querySelector('#vaciar-carrito')
    botonVaciar.addEventListener('click', async() => {
        sessionStorage.clear()
        ProductosCarrito()  
    })

}


items.addEventListener('click', e => {
    btnAccion(e)
})

//Funcion que detecta el evento "click" y cambia una clase en la SVG carrito. Esto permite la animacion del carrito
$('.carritoCompras').on('click','svg',(e) => { 
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

const btnAccion = (e) => {
    //Aumenta la cantidad de productos en el carrito
    if(e.target.classList.contains('btn-info')){           
        let productoSumar = JSON.parse(sessionStorage.getItem(e.target.dataset.id));     
        const precio = (productoSumar.Precio/productoSumar.Cantidad)
        productoSumar.Cantidad++
        productoSumar.Precio = precio * productoSumar.Cantidad
        sessionStorage.setItem(e.target.dataset.id, JSON.stringify(productoSumar));
        ProductosCarrito()
        //Disminuye la cantidad de productos en el carrito
    }if(e.target.classList.contains('btn-danger')){           
        let productoSumar = JSON.parse(sessionStorage.getItem(e.target.dataset.id));     
        const precio = (productoSumar.Precio/productoSumar.Cantidad)
        productoSumar.Cantidad--
        productoSumar.Precio = precio * productoSumar.Cantidad
        sessionStorage.setItem(e.target.dataset.id, JSON.stringify(productoSumar));
        ProductosCarrito()

}
e.stopPropagation()
}


