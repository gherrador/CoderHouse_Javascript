const filtroProd = document.getElementById("filtrar_Productos")
const filtroPre = document.getElementById("filtrar_Precio")
const comidas = document.querySelector(".Comidas")
const utensillosCocina = document.querySelector(".utensillosCocina")
const bebidas = document.querySelector('.bebidas')
const golosinas = document.querySelector('.golosinas')
const productos = document.getElementById('productos');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const valueMin = document.querySelector("#slider_ValueOutputMin")
const valueMax = document.querySelector("#slider_ValueOutputMax")
const divisa = "$"


export const loadProducts = async () => {
    return fetch('./BD/productos.json', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => {
        return resp.json()
    })
    .catch((err) => {
        return err
    })
}

filtroProd.addEventListener('click', e => {
    e.preventDefault()
    filtroProductos()
})

filtroPre.addEventListener('click', e => {
    e.preventDefault()
    filtroPrecio()
})

const filtroProductos = async() => {
    const datos = await loadProducts()     
    let opcion = ''
    if(comidas.checked){
        opcion = comidas.value
    }else if(utensillosCocina.checked){
        opcion = utensillosCocina.value
    }else if(bebidas.checked){
        opcion = bebidas.value
    }else{
        opcion=golosinas.value
    }
    const data = datos.filter((el) => el.Categoria === opcion);    
    renderCard(data)
}

const filtroPrecio = async() => {
    const datos = await loadProducts()     
    const data = datos.filter(el => (el.Precio >= valueMin.value && el.Precio <= valueMax.value));    
    renderCard(data)
}

const renderCard = data => {
    productos.innerHTML = ''
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
  }

        