import { loadProducts } from './Productos.js'
import { add_Product } from './Carrito.js'
const sliderMin = document.getElementById("slider_ValueInputMin");
const outputMin = document.getElementById("slider_ValueOutputMin");
const sliderMax = document.getElementById("slider_ValueInputMax");
const outputMax = document.querySelector("#slider_ValueOutputMax");
const productos = document.getElementById('productos');
const templateCard = document.getElementById('template-card').content
const nombrePagina = document.getElementById('nombrePagina')
const fragment = document.createDocumentFragment()
const divisa = "$"

//Evento que sucede cuando se carga el DOM. Se recupera la totalidad de productos en el JSON productos y se envia la informacion a la funcion renderCard.
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadProducts()
  renderCard(data)
})


//Al apretar sobre el nombre, se regresa a la pagina principal y se evita que la pagina recargue.
nombrePagina.addEventListener('click', async (e) => {
  try {
    e.preventDefault()
    const data = await loadProducts()
    productos.innerHTML = ''
    renderCard(data)
  } catch (err) {
    console.error("El link o alguna funcionalidad del mismo no funciona correctamente", err)
  }
})

//Por cada producto(objeto) en el archivo JSON, dibuja la tarjeta con los datos del objeto producto.
export const renderCard = (data) => {
  productos.innerHTML = ''
  try {
    data.forEach(producto => {
      templateCard.querySelector('#tituloProducto').textContent = producto.Nombre
      templateCard.querySelector('#descripcionProducto').textContent = producto.Descripcion
      templateCard.querySelector('#precioProducto').textContent = `${divisa}` + producto.Precio
      templateCard.querySelector('img').setAttribute('src', producto.Foto);
      templateCard.querySelector('[name="btnComprar"]').dataset.id = producto.Id
      const cloneCard = templateCard.cloneNode(true);
      fragment.appendChild(cloneCard)
    });
    productos.appendChild(fragment)
  } catch (err) {
    console.error("No se ha logrado renderizar correctamente la lista de productos", err)
  }
}

//Al detectar el evento, envio al carrito la informacion del producto seleccionado.
productos.addEventListener('click', e => {
  try {
    if (e.target.classList.contains('btn-success')) {
      add_Product(e.target.parentElement, e);
    }
    e.stopPropagation()
  } catch (err) {
    console.error("Es posible que el boton no funcione correctamente", err)
  }
})

//Movimiento de slider de filtro de precio Min
outputMin.innerHTML = sliderMin.value;
sliderMin.oninput = function () {
  outputMin.innerHTML = this.value;
}

//Movimiento de slider de filtro de precio Max
outputMax.innerHTML = sliderMax.value;
sliderMax.oninput = function () {
  outputMax.innerHTML = this.value;
}

