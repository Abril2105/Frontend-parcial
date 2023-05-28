export const getLibros = async () => {

    const url = 'http://localhost:8080/libros/todos'
    const resp = await fetch (url)
    const data = await resp.json();
    
    const libroList = data.map(libro => ({
      titulo : libro.titulo,
      autor : libro.autor,
      categoria : libro.categoria
    }))
    return libroList;
    }