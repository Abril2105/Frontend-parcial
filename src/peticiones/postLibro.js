export const postLibro = async (libro) => {
    const url = 'http://localhost:8080/libro/crear'
    const resp = await fetch (url, {
        method : 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(libro)
    })
    const respuesta = await resp.json();
    console.log(respuesta);
    }