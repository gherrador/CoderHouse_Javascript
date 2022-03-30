const filtroProd = document.getElementById("filtrar_Productos")
const filtroPre = document.getElementById("filtrar_Precio")
const comidas = document.querySelector(".Comidas")
const utensillosCocina = document.querySelector(".utensillosCocina")
const bebidas = document.querySelector('.bebidas')
const golosinas = document.querySelector('.golosinas')
const valueMin = document.querySelector("#slider_ValueOutputMin")
const valueMax = document.querySelector("#slider_ValueOutputMax")
import { renderCard } from './main.js'

export const loadProducts = async () => {
    try {
        return fetch('./BD/productos.json')
            .then((resp) => {
                return resp.json()
            })
            .catch((err) => {
                return err
            })
    } catch (err) {
        console.log(err)
    }
}

filtroProd.addEventListener('click', e => {
    try {
        e.preventDefault()
        filtroProductos()
    } catch (err) {
        console.log(err)
    }
})

filtroPre.addEventListener('click', e => {
    try{
    e.preventDefault()
    filtroPrecio()
}catch(err){
    console.log(err)
}
})

const filtroProductos = async () => {
    try {
        const datos = await loadProducts()
        let opcion = ''
        if (comidas.checked) {
            opcion = comidas.value
        } else if (utensillosCocina.checked) {
            opcion = utensillosCocina.value
        } else if (bebidas.checked) {
            opcion = bebidas.value
        } else {
            opcion = golosinas.value
        }
        const data = datos.filter((el) => el.Categoria === opcion);
        renderCard(data)
    } catch (err) {
        console.log(err)
    }
}

const filtroPrecio = async () => {
    try {
        const datos = await loadProducts()
        const data = datos.filter(el => (el.Precio >= valueMin.value && el.Precio <= valueMax.value));
        renderCard(data)
    } catch (err) {
        console.error(err)
    }
}
