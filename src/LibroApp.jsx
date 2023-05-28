import { useEffect, useState } from "react"
import { FormularioLibro } from "./componentes/FormularioLibro";
import { TablaLibro } from "./componentes/TablaLibro";
import { getLibros } from "./peticiones/getLibros";
import { postLibro } from "./peticiones/postLibro";
import { editarLibro } from "./peticiones/editarLibro";


export const LibrosApp = () => {

    const [libros, setLibros] = useState([]);
    console.log(libros);

    const agregarLibro = (libro) => {
        setLibros([...libros, libro])
        
    }
    const cargueLibros = async () => {
        
    }
    useEffect(()=>{
        cargueLibros();
    },[])
    const editarLibros = (libro) => {
        console.log(libro);
        setLibros(libro);
    }
    
    return (
        <>
            <FormularioLibro agregar={(librito) => { agregarLibro(librito) }} />
            <TablaLibro listaLibros={libros} />
        </>
    )
}