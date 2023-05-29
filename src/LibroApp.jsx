import { useEffect, useState } from "react"
import { FormularioLibro } from "./componentes/FormularioLibro";
import { TablaLibro } from "./componentes/TablaLibro";
import { HomeLibro } from "./componentes/HomeLibro";
import { RentaLibro } from "./componentes/RentaLibro";
import { getLibros } from "./peticiones/getLibros";
import { postLibro } from "./peticiones/postLibro";

export const LibrosApp = () => {

    const [libros, setLibros] = useState([]);
    const [currentPage, setCurrentPage] = useState("home");
    console.log(libros);

    const agregarLibro = (libro) => {
        setLibros([...libros, libro])
        postLibro(libro);
        setCurrentPage("formulario");
    }
    const cargueLibros = async () => {
        const datos = await getLibros()
        setLibros(datos)
        setCurrentPage("formulario");
    }
    useEffect(() => {
        cargueLibros();
    }, [])
    const cambiarPagina = (pagina) => {
        setCurrentPage(pagina);
    };

    

    const renderContent = () => {
        switch (currentPage) {
          case "home":
            return <HomeLibro/>;
          case "formulario":
            return (
              <>
                <FormularioLibro agregar={agregarLibro} />
                <TablaLibro listaLibros={libros} />
              </>
            );
            case "rentas":
                return <RentaLibro/>
          default:
            return null;
        }
      };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">NAVEGADOR</a>
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
                                    Home
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link btn ${currentPage === "formulario" ? "active" : ""}`}
                                    onClick={() => cambiarPagina("formulario")}
                                >
                                    Formulario
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