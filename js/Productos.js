import { renderCard } from './main.js'

export const loadProducts = async()=> {
    try {
      var response = await fetch('./BD/productos.json')
      return response.json();
    } catch (err) {
      console.error('la base de datos no ha sido cargada correctamente',err);
    }
  }

//Al apretar sobre el boton filtrado, cambiara la clase del boton y su css (rojo para eliminar filtro y verde para aplicar filtro)
$('#filtrar_Productos').on('click', e => {
    try {
        $('#filtrar_Productos').attr('Class')==='btn btn-success' ? 
        $('#filtrar_Productos').text('Eliminar Filtro').removeClass('btn-success').addClass('btn-danger').css({'background': 'linear-gradient(90deg, rgba(249,71,71,1) 0%, rgba(177,0,0,1) 100%, rgba(255,0,0,1) 100%','box-shadow': '0 0.7em 1.5em -0.5em rgba(93, 0, 0, 0.8)'})&& filtroProductos() :
        $('#filtrar_Productos').text('Aplicar Filtro').removeClass('btn-danger').addClass('btn-success').css({'background': 'linear-gradient(0deg, rgba(20, 167, 62, 1) 0%, rgba(102, 247, 113, 1) 100%', 'box-shadow': '0 0.7em 1.5em -0.5em #14a73e98'})&& eliminarFiltro()
        e.preventDefault()
    } catch (err) {
        console.error("el boton de filtro no funciona correctamente",err)
    }
})

//Al apretar sobre el boton filtrado, cambiara la clase del boton y su css (rojo para eliminar filtro y verde para aplicar filtro)
$('#filtrar_Precio').on('click', e => {
    try {
        $('#filtrar_Precio').attr('Class')==='btn btn-success' ? 
        $('#filtrar_Precio').text('Eliminar Filtro').removeClass('btn-success').addClass('btn-danger').css({'background': 'linear-gradient(90deg, rgba(249,71,71,1) 0%, rgba(177,0,0,1) 100%, rgba(255,0,0,1) 100%','box-shadow': '0 0.7em 1.5em -0.5em rgba(93, 0, 0, 0.8)'}) && filtroPrecio() :
        $('#filtrar_Precio').text('Aplicar Filtro').removeClass('btn-danger').addClass('btn-success').css({'background': 'linear-gradient(0deg, rgba(20, 167, 62, 1) 0%, rgba(102, 247, 113, 1) 100%', 'box-shadow': '0 0.7em 1.5em -0.5em #14a73e98'}) && eliminarFiltro()
        e.preventDefault()
    } catch (err) {
        console.error("El boton de filtro no funciona correctamente",err)
    }
})

//Funcion para filtrar productos por categoria
const filtroProductos = async () => {
    try {
        const datos = await loadProducts()
        let opcion = ''
        $('.Comidas').is(':checked') && (opcion = $('.Comidas').val()) && ($('#titulo_productos').html(`<h2>Comidas:</h>`))
        $('.utensillosCocina').is(':checked') && (opcion = $('.utensillosCocina').val()) && ($('#titulo_productos').html(`<h2>Utensillos de Cocina:</h>`))
        $('.bebidas').is(':checked') && (opcion = $('.bebidas').val()) && ($('#titulo_productos').html(`<h2>Bebidas:</h>`))
        $('.golosinas').is(':checked') && (opcion = $('.golosinas').val()) && ($('#titulo_productos').html(`<h2>Dulces/Golosinas:</h>`))
        const data = datos.filter((el) => el.Categoria === opcion);
        renderCard(data)
    } catch (err) {
        console.error("El filtro no funciona correctamente",err)
    }
}

//Funcion para filtrar productos por precio
const filtroPrecio = async () => {
    try {
        const datos = await loadProducts()
        const data = datos.filter(el => (el.Precio >= $('#slider_valueMin').text() && el.Precio <= $('#slider_valueMax').text()));
        $('#titulo_productos').html(`<h2>Productos entre $${$('#slider_valueMin').text()} y $${$('#slider_valueMax').text()}</h>`)
        renderCard(data)
    } catch (err) {
        console.error("El filtro no funciona correctamente",err)
    }
}

//Al eliminar el filtro, devuelve todos los productos a la pantalla principal
const eliminarFiltro = async() => {
    try{
        $('#titulo_productos').html(`<h2>Productos Destacados:</h>`)
        const data = await loadProducts()
        renderCard(data)
    }catch(err){
        console.error("Fue imposible eliminar el filtro", err)
    }
}