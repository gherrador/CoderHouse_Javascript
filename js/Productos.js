import { renderCard } from './main.js'
let productos = []
let productosPrecio = []

export const loadProducts = async () => {
    try {
        var response = await fetch('./BD/productos.json')
        return response.json();
    } catch (err) {
        console.error('la base de datos no ha sido cargada correctamente', err);
    }
}

//Al hacer click sobre el nombre, se regresa a la pagina principal,se evita que la pagina recargue//
// y los botones de filtro y texto vuelven a la normalidad.//
$(".nombre").on("click", async (e) => {
    try {
        $('#filtrar_Productos').text('Aplicar Filtro').removeClass().addClass('verde') && eliminarFiltro()
        $('#filtrar_Precio').text('Aplicar Filtro').removeClass().addClass('verde') && eliminarFiltroPrecio()
        e.preventDefault()
        const data = await loadProducts()
        renderCard(data)
        $('#titulo_productos').html(`<h2>Productos Destacados:</h>`)
    } catch (err) {
        console.error("la pagina no se cargo correctamente", err)
    }
});

//Al apretar sobre el boton filtrado, cambiara la clase del boton y su css (rojo para eliminar filtro y verde para aplicar filtro)
$('#filtrar_Productos').on('click', e => {
    try {
        $('#filtrar_Productos').attr('Class') === 'verde' ?
            $('#filtrar_Productos').text('Eliminar Filtro').toggleClass('rojo') && filtroProductos() :
            $('#filtrar_Productos').text('Aplicar Filtro').toggleClass('rojo') && eliminarFiltro()
        e.preventDefault()
    } catch (err) {
        console.error("el boton de filtro no funciona correctamente", err)
    }
})

//Al apretar sobre el boton filtrado, cambiara la clase del boton y su css (rojo para eliminar filtro y verde para aplicar filtro)
$('#filtrar_Precio').on('click', e => {
    try {
        $('#filtrar_Precio').attr('Class') === 'verde' ?
            $('#filtrar_Precio').text('Eliminar Filtro').toggleClass('rojo') && filtroPrecio() :
            $('#filtrar_Precio').text('Aplicar Filtro').toggleClass('rojo') && eliminarFiltroPrecio()
        e.preventDefault()
    } catch (err) {
        console.error("El boton de filtro no funciona correctamente", err)
    }
})

//Funcion para filtrar productos por categoria. 
//Si existe ya el filtro por precio aplicado, filtra sobre los productos mostrados por rango de precio
const filtroProductos = async () => {
    try {
        let opcion = ''
        $('.Comidas').is(':checked') && (opcion = $('.Comidas').val()) && ($('#titulo_productos').html(`<h2>Comidas:</h>`))
        $('.utensillosCocina').is(':checked') && (opcion = $('.utensillosCocina').val()) && ($('#titulo_productos').html(`<h2>Utensillos de Cocina:</h>`))
        $('.bebidas').is(':checked') && (opcion = $('.bebidas').val()) && ($('#titulo_productos').html(`<h2>Bebidas:</h>`))
        $('.golosinas').is(':checked') && (opcion = $('.golosinas').val()) && ($('#titulo_productos').html(`<h2>Dulces/Golosinas:</h>`))
        if (productosPrecio.length > 0) {
            const productos = productosPrecio.filter((el) => el.Categoria === opcion);
            renderCard(productos)
        } else {
            const datos = await loadProducts()
            const data = datos.filter((el) => el.Categoria === opcion);
            if (opcion != '') {
                productos.length = 0
                data.forEach((value, index) => {
                    productos.push(value)
                })
            }
            renderCard(data)
        }
    } catch (err) {
        console.error("El filtro no funciona correctamente", err)
    }
}

//Funcion para filtrar productos por precio
//Si existe ya un filtro aplicado por categoria de producto, se filtra sobre esa categoria
const filtroPrecio = async () => {
    try {
        const datos = await loadProducts()
        const precioMenor = $('#slider_valueMin').text()
        const precioMayor = $('#slider_valueMax').text()
        if (productos.length > 0) {
            const data = productos.filter(el => (el.Precio >= precioMenor && el.Precio <= precioMayor));
            renderCard(data)
        } else {
            const data = datos.filter(el => (el.Precio >= precioMenor && el.Precio <= precioMayor));
            $('#titulo_productos').html(`<h2>Productos entre $${$('#slider_valueMin').text()} y $${$('#slider_valueMax').text()}</h>`)
            renderCard(data)
            data.forEach((value, index) => {
                productosPrecio.push(value)
            })
        }
    } catch (err) {
        console.error("El filtro no funciona correctamente", err)
    }
}

//Elimina el filtro precio. Si existe una categoria seleccionada, se mostraran los productos de esa categoria
const eliminarFiltroPrecio = async () => {
    try {
        if (productos.length > 0) {
            renderCard(productos)
        } else {
            $('#titulo_productos').html(`<h2>Productos Destacados:</h>`)
            const data = await loadProducts()
            renderCard(data)
            productosPrecio.length = 0
        }
    } catch (err) {
        console.error("Fue imposible eliminar el filtro", err)
    }
}

//Elimina el filtro categoria, si existen productos filtrados por rango de precio, mostraran esos productos
const eliminarFiltro = async () => {
    try {
        if(productosPrecio.length >0){
            renderCard(productosPrecio)
        }else{
        $('#titulo_productos').html(`<h2>Productos Destacados:</h>`)
        const data = await loadProducts()
        renderCard(data)
        productos.length = 0
        }
    } catch (err) {
        console.error("Fue imposible eliminar el filtro", err)
    }
}
