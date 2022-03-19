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

        