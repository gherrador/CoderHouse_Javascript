const divisa = "$"
const sliderMin = document.getElementById("slider_ValueInputMin");
const outputMin = document.getElementById("slider_ValueOutputMin");
const sliderMax = document.getElementById("slider_ValueInputMax");
const outputMax = document.getElementById("slider_ValueOutputMax");
const addproduct = document.querySelector(".btn-success")


import { loadProducts } from './Productos.js'
import { add_Product } from './Carrito.js'

document.addEventListener('DOMContentLoaded', async () => {
    const productos = document.querySelector('#productos')
    const data = await loadProducts()
    data.forEach(producto => {
        // Estructura de la tarjeta
        const card_Estructure = document.createElement('div');
        card_Estructure.classList.add('card')

        // Cuerpo de la tarjeta

        const body_Product = document.createElement('div');
        body_Product.classList.add('card-body')

        // Titutlo del producto

        const card_Title = document.createElement('h5')
        card_Title.classList.add('product-Name')        
        card_Title.textContent = producto.Nombre

        // Descripcion del producto

        const card_Description = document.createElement('p')
        card_Description.classList.add('product-Description')
        card_Description.textContent = producto.Descripcion


        // Imagen del producto

        const image_Product = document.createElement('img');
        image_Product.classList.add('img-product');
        image_Product.setAttribute('src', producto.Foto);

        // Precio del producto

        const price_Product = document.createElement('p');
        price_Product.classList.add('product-Price');
        price_Product.textContent = "Precio:" + " " + `${divisa}${producto.Precio}`;

        // Boton agregar producto

        const product_button = document.createElement('button');
        product_button.classList.add('btn', 'btn-success');
        product_button.textContent = 'Agregar al carrito';
        product_button.setAttribute('id', producto.Id)
        product_button.setAttribute('nombre', producto.Nombre)
        product_button.setAttribute('descripcion', producto.Descripcion)
        product_button.setAttribute('precio', producto.Precio)
        product_button.setAttribute('foto', producto.Foto)
        product_button.setAttribute('categoria', producto.Categoria)
        product_button.addEventListener('click', add_Product);        

        // Insertamos
        body_Product.appendChild(image_Product);
        body_Product.appendChild(card_Title);
        body_Product.appendChild(card_Description);
        body_Product.appendChild(price_Product);
        body_Product.appendChild(product_button)
        card_Estructure.appendChild(body_Product);
        productos.appendChild(card_Estructure);
    })
})

//Movimiento de slider de filtro de precio Min
outputMin.innerHTML = sliderMin.value; 
sliderMin.oninput = function() {
  outputMin.innerHTML = this.value;
}
//Movimiento de slider de filtro de precio Max
outputMax.innerHTML = sliderMax.value; 
sliderMax.oninput = function() {
  outputMax.innerHTML = this.value;
}



