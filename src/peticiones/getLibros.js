export const getLibros = async () => {

    const url = 'http://localhost:8080/libros/todos'
    const resp = await fetch (url)
    const data = await resp.json();
    
    const libroList = data.map(libro => ({
      id : libro.id,
      titulo : libro.titulo,
      autor : libro.autor,
      genero : libro.genero,
      descripcion : libro.descripcion
    }))
    return libroList;
    }