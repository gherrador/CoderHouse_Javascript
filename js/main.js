import { loadProducts } from './Productos.js'
import { add_Product } from './Carrito.js'
const fragment = document.createDocumentFragment()
const divisa = "$"

//Evento que sucede cuando se carga el DOM. Se recupera la totalidad de productos en el JSON productos y se envia la informacion a la funcion renderCard.
$(document).ready(async () => {
  try {
    const data = await loadProducts()
    renderCard(data)
  } catch (err) {
    console.error("la pagina no se cargo correctamente", err)
  }
})

//Por cada producto(objeto) en el archivo JSON, dibuja la tarjeta con los datos del objeto producto.
export const renderCard = (data) => {
  $('#productos').html('')
  try {
    $.each(data, (index, producto) => {
      $('#template-card').contents().find('#tituloProducto').text(producto.Nombre)
      $('#template-card').contents().find('#descripcionProducto').text(producto.Descripcion)
      $('#template-card').contents().find('#precioProducto').text(`${divisa}` + producto.Precio)
      $('#template-card').contents().find('#fotoProducto').attr('src', producto.Foto);
      $('#template-card').contents().find('[name="btnComprar"]').attr('data-id', producto.Id)
      const cloneCard = $('#template-card').contents().clone();
      $(fragment).append(cloneCard)
    });
    $('#productos').append(fragment)
  } catch (err) {
    console.error("No se ha logrado renderizar correctamente la lista de productos", err)
  }
}

//Al detectar el evento, envio al carrito la informacion del producto seleccionado.
$('#productos').on('click', e => {
  try {
    $('.btn-success').has(e.target) && add_Product(e.target.parentElement);    
    e.stopPropagation()
  } catch (err) {
    console.error("Es posible que el boton no funcione correctamente", err)
  }
})

//Movimiento de slider de filtro de precio Min
$('#sliderMin').on('input', function() {
  $('#slider_valueMin').html( $(this).val() );
});

//Movimiento de slider de filtro de precio Max
$('#sliderMax').on('input', function() {
  $('#slider_valueMax').html( $(this).val() );
});
