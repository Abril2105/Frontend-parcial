import { useEffect, useState } from "react"
import { FormularioLibro } from "./componentes/FormularioLibro";
import { TablaLibro } from "./componentes/TablaLibro";
import { getLibros } from "./peticiones/getLibros";
import { postLibro } from "./peticiones/postLibro";
import { editarLibro } from "./peticiones/editarLibro";
import backgroundImage from './biblioteca.jpg';



export const LibrosApp = () => {

    const [libros, setLibros] = useState([]);
    const [currentPage, setCurrentPage] = useState("home");
    console.log(libros);

    const agregarLibro = (libro) => {
        setLibros([...libros, libro])
        postLibro(libro);
    }
    const cargueLibros = async () => {
        const datos = await getLibros()
        setLibros(datos)
    }
    useEffect(() => {
        cargueLibros();
    }, [])
    const editarLibros = (libro) => {
        console.log(libro);
        setLibros(libro);
    }
    const cambiarPagina = (pagina) => {
        setCurrentPage(pagina);
    };

    const renderContent = () => {
        switch (currentPage) {
            case "formulario":
                return (
                    <div
                        style={{
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            
                            alignItems: "center",
                            color: "black",
                            fontSize: "10",
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover'

                        }}
                    >
                    </div>
                    
                );
            default:
                return (
                    <>
                        <FormularioLibro agregar={agregarLibro} />
                        <TablaLibro listaLibros={libros} />
                    </>
                );
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                <a href="LibroApp.jsx" className="logo"><img src='./Logo.jpg' alt="Logo" /></a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button
                                    className={`nav-link btn ${currentPage === "home" ? "active" : ""}`}
                                    onClick={() => cambiarPagina("home")}
                                >
                                    Formulario Libro
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link btn ${currentPage === "formulario" ? "active" : ""}`}
                                    onClick={() => cambiarPagina("formulario")}
                                >
                                    Home
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link btn ${currentPage === "rentas" ? "active" : ""}`}
                                    onClick={() => cambiarPagina("rentas")}
                                >
                                    Rentas
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {renderContent()}
        </>
    );
};