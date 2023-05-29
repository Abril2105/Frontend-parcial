import { useState } from "react";
import Modal from 'react-modal';

export const TablaLibro = ({ listaLibros }) => {
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const cerrarModal = () => {
        setModalAbierto(false);
    };

    const informacion = (libro) => {
        setLibroSeleccionado(libro);
        setSelectedBook(libro);
        setModalAbierto(true);
    }

    const [buscarGen, setBuscarGen] = useState("");
    const [buscarTitulo, setBuscarTitulo] = useState("");
    const [buscarAutor, setBuscarAutor] = useState("");
    const [busqueda, setBusqueda] = useState("");


    const [LibrosEncontradosGen, setLibrosEncontradosGen] = useState([]);
    const [LibrosEncontradosTitulo, setLibrosEncontradosTitulo] = useState([]);
    const [LibrosEncontradosAutor, setLibrosEncontradosAutor] = useState([]);

    function deleteRow(event) {
        const row = event.target.parentNode.parentNode;
        const idCell = row.querySelector('td:first-child');
        const id = idCell.textContent.trim();

        fetch(`http://localhost:8080/libro/eliminar/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    row.parentNode.removeChild(row);
                }
            })
    }

    const buscarLibroPorGenero = (genero) => {
        const librosEncontrados = listaLibros.filter((libro) => libro.genero === genero);
        if (librosEncontrados.length === 0) {
            window.alert("No se encontraron libros con el género especificado.");
            setBuscarGen("");
            document.getElementById("buscarGenero").disabled = true;
            return [];
        } else {
            return librosEncontrados;
        }
    };


    const buscarLibroPorTitulo = (titulo) => {
        const librosEncontrados = listaLibros.filter((libro) => libro.titulo === titulo);
        if (librosEncontrados.length === 0) {
            window.alert("No se encontraron libros con el titulo especificado.");
            setBuscarTitulo("");
            document.getElementById("buscarTitulo").disabled = true;
            return [];
        } else {
            return librosEncontrados;
        }
    };

    const buscarLibroPorAutor = (autor) => {
        const librosEncontrados = listaLibros.filter((libro) => libro.autor === autor);
        if (librosEncontrados.length === 0) {
            window.alert("No se encontraron libros con el autor especificado.");
            setBuscarAutor("");
            document.getElementById("buscarAutor").disabled = true;
            return [];
        } else {
            return librosEncontrados;
        }
    };

    const buscarLibGen = (event) => {
        event.preventDefault();
        const LibrosEncontrados = buscarLibroPorGenero(buscarGen);
        setLibrosEncontradosGen(LibrosEncontrados);
    };

    const buscarLibTitulo = (event) => {
        event.preventDefault();
        const LibrosEncontrados = buscarLibroPorTitulo(buscarTitulo);
        setLibrosEncontradosTitulo(LibrosEncontrados);
    }

    const buscarLibAutor = (event) => {
        event.preventDefault();
        const LibrosEncontrados = buscarLibroPorAutor(buscarAutor);
        setLibrosEncontradosAutor(LibrosEncontrados)
    }

    const limpiarBusqueda = () => {
        setBuscarTitulo("");
        setBuscarGen("");
        setBuscarAutor("");
        setLibrosEncontradosTitulo([]);
        setLibrosEncontradosGen([]);
        setLibrosEncontradosAutor([]);
        document.getElementById("buscarAutor").disabled = true;
        document.getElementById("buscarTitulo").disabled = true;
        document.getElementById("buscarGenero").disabled = true;
    };

    function habilitarButtonTitulo() {
        var titu = document.getElementById("busquedaTitulo").value
        if (titu.length > 0) {

            document.getElementById("buscarAutor").disabled = true;
            document.getElementById("buscarGenero").disabled = true;
            document.getElementById("buscarTitulo").disabled = false;
            setBuscarAutor("");
            setBuscarGen("");

            document.getElementById("buscarTitulo").disabled = false;

        } else {
            document.getElementById("buscarTitulo").disabled = true;
        }
    }

    function habilitarButtonAutor() {
        var auto = document.getElementById("busquedaAutor").value
        if (auto.length > 0) {
            document.getElementById("buscarAutor").disabled = false;

            document.getElementById("buscarGenero").disabled = true;
            document.getElementById("buscarTitulo").disabled = true;
            setBuscarTitulo("");
            setBuscarGen("");

        } else {
            document.getElementById("buscarAutor").disabled = true;
        }
    }

    function habilitarButtonGenero() {
        var gen = document.getElementById("busquedaGenero").value
        if (gen == "") {
            document.getElementById("buscarGenero").disabled = true;
        } else {
            document.getElementById("buscarGenero").disabled = false;
        }
    }
    function busquedaGeneral() {
        var busq = document.getElementById("busquedaTipo").value
        if (busq == "Titulo") {
            document.getElementById("busquedaTipo").style.display = "none"
            document.getElementById("busTitulo").style.display = "block"
            document.getElementById("busquedaTitulo").style.display = "block"
            document.getElementById("buscarTitulo").style.display = "block"
            document.getElementById("volverTitulo").style.display = "block"
            document.getElementById("floatingBus").style.display = "none"

        } else if (busq == "Autor") {
            document.getElementById("busquedaTipo").style.display = "none"
            document.getElementById("busAutor").style.display = "block"
            document.getElementById("busquedaAutor").style.display = "block"
            document.getElementById("buscarAutor").style.display = "block"
            document.getElementById("volverAutor").style.display = "block"
            document.getElementById("floatingBus").style.display = "none"
        } else if (busq == "Categoria") {
            document.getElementById("busquedaTipo").style.display = "none"
            document.getElementById("busGenero").style.display = "block"
            document.getElementById("busquedaGenero").style.display = "block"
            document.getElementById("buscarGenero").style.display = "block"
            document.getElementById("volverGenero").style.display = "block"
            document.getElementById("floatingBus").style.display = "none"
        }
    }

    function volverTitulo(event) {
        event.preventDefault();
        document.getElementById("busquedaTipo").style.display = "block"
        document.getElementById("busTitulo").style.display = "none"
        document.getElementById("busquedaTitulo").style.display = "none"
        document.getElementById("buscarTitulo").style.display = "none"
        document.getElementById("volverTitulo").style.display = "none"
        document.getElementById("floatingBus").style.display = "block"
        setBusqueda("");
    }

    function volverAutor(event) {
        event.preventDefault();
        document.getElementById("busquedaTipo").style.display = "block"
        document.getElementById("busAutor").style.display = "none"
        document.getElementById("busquedaAutor").style.display = "none"
        document.getElementById("buscarAutor").style.display = "none"
        document.getElementById("volverAutor").style.display = "none"
        document.getElementById("floatingBus").style.display = "block"
        setBusqueda("");
    }

    function volverGenero(event) {
        event.preventDefault();
        document.getElementById("busquedaTipo").style.display = "block"
        document.getElementById("busGenero").style.display = "none"
        document.getElementById("busquedaGenero").style.display = "none"
        document.getElementById("buscarGenero").style.display = "none"
        document.getElementById("volverGenero").style.display = "none"
        document.getElementById("floatingBus").style.display = "block"
        setBuscarGen("");
        setBusqueda("");
    }

    const librosEncontrados = LibrosEncontradosGen.length > 0 || LibrosEncontradosTitulo.length > 0 || LibrosEncontradosAutor.length > 0;

    return (
        <>
            <h2 id="Busquedas" className="text-left text-dark" style={{ fontSize: "50px", margin: "0", padding: "0" }}>Busquedas</h2>
            <div className="form-floating">
                <select class="form-select" id="busquedaTipo" value={busqueda} onChange={(event) => { setBusqueda(event.target.value); busquedaGeneral(); }}>
                    <option value="" selected>Seleccione un tipo de busqueda</option>
                    <option value="Titulo">Titulo</option>
                    <option value="Autor">Autor</option>
                    <option value="Categoria">Categoria</option>
                </select>
                <label id="floatingBus" for="floatingSelect">Busqueda</label>
                <br></br>
            </div>

            <form onSubmit={buscarLibTitulo} >
                <div className="form-group input-group">
                    <label style={{ display: "none" }} id="busTitulo" class="input-group-text futurama " for="inputGroupSelect01" >Titulo</label>
                    <input style={{ display: "none" }} type="text" className="form-control" id="busquedaTitulo" placeholder="Titulo" value={buscarTitulo} onChange={(event) => { setBuscarTitulo(event.target.value); habilitarButtonTitulo(); }} />
                    <button style={{ display: "none" }} id="buscarTitulo" type="submit" class="btn btn-dark" disabled> Buscar</button>
                    <button style={{ display: "none" }} id="volverTitulo" type="submit" class="btn btn-dark" onClick={volverTitulo}> Volver</button>
                </div>
            </form>

            <form onSubmit={buscarLibAutor}>
                <div className="form-group input-group">
                    <label style={{ display: "none" }} id="busAutor" class="input-group-text futurama " for="inputGroupSelect01" >Autor</label>
                    <input style={{ display: "none" }} type="text" className="form-control" id="busquedaAutor" placeholder="Autor" value={buscarAutor} onChange={(event) => { setBuscarAutor(event.target.value); habilitarButtonAutor(); }} />
                    <button style={{ display: "none" }} id="buscarAutor" type="submit" class="btn btn-dark" disabled> Buscar</button>
                    <button style={{ display: "none" }} id="volverAutor" type="submit" class="btn btn-dark" onClick={volverAutor}> Volver</button>
                </div>
            </form>

            <form onSubmit={buscarLibGen}>
                <div className="form-floating">
                    <select style={{ display: "none" }} class="form-select" id="busquedaGenero" value={buscarGen} onChange={(event) => { setBuscarGen(event.target.value); habilitarButtonGenero(); }}>

                        <option value="" selected>Seleccione un genero</option>
                        <option value="Ficcion">Ficcion</option>
                        <option value="Novela">Novela</option>
                        <option value="Suspenso">Suspenso</option>
                        <option value="Fantasia">Fantasia</option>
                        <option value="Romance">Romance</option>
                        <option value="Historia">Historia</option>
                    </select>
                    <label style={{ display: "none" }} id="busGenero" for="floatingSelect">Genero</label>
                    <button style={{ display: "none" }} id="buscarGenero" type="submit" class="btn btn-dark" disabled> Buscar</button>
                    <button style={{ display: "none" }} id="volverGenero" type="submit" class="btn btn-dark" onClick={volverGenero}> Volver</button>

                </div>
            </form>

            {
                librosEncontrados ? (
                    <div >
                        <h3 id="Busquedas" className="text-left text-dark" style={{ fontSize: "35px", margin: "0", padding: "0" }}>Libros encontrados:</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id Libro</th>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Autor</th>
                                    <th scope="col">Genero</th>
                                    <th scope="col">Informacion</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LibrosEncontradosGen.map((libro) => (
                                    <tr>
                                        <td>{libro.id}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                        <td>
                                        <button className="btn btn-success" onClick={() => informacion(libro)}> Informacion </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={deleteRow}> Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                                {LibrosEncontradosTitulo.map((libro) => (
                                    <tr>
                                        <td>{libro.id}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                        <td>
                                        <button className="btn btn-success" onClick={() => informacion(libro)}> Informacion </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={deleteRow}> Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                                {LibrosEncontradosAutor.map((libro) => (
                                    <tr>
                                        <td>{libro.id}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                        <td>
                                        <button className="btn btn-success" onClick={() => informacion(libro)}> Informacion </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={deleteRow}> Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={limpiarBusqueda} id="buscarGenero" type="submit" class="btn btn-dark" > Limpiar busqueda</button>
                    </div>
                ) : (
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id Libro</th>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Autor</th>
                                    <th scope="col">Genero</th>
                                    <th scope="col">Informacion</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaLibros.map((libro) => (
                                    <tr>
                                        <td>{libro.id}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => informacion(libro)}> Informacion </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={deleteRow}> Eliminar</button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            <style>
                {`
                    .color{
                        background-color: #AD9978;
                    }

                    .table{
                        background-color: #AD9978;
                    }

                    .futurama{
                        background-color: #222;
                        color: #fff;
                        padding: 8px 12px;
                        border-radius: 4px;
                        font-family: 'Arial', sans-serif;
                        font-size: 14px;
                        text-transform: uppercase;
                    }  
                    Body {Background-color : #AD9978;}

                    `}
                <Modal
                    isOpen={modalAbierto}
                    onRequestClose={cerrarModal}
                    style={{
                        content: {
                            width: '500px',
                            height: '400px',
                        },
                    }}
                >
                    {libroSeleccionado && (
                        <div className="ventana-emergente">
                            <h2>Información del libro</h2>
                            <p>Título: {libroSeleccionado.titulo}</p>
                            <p>Autor: {libroSeleccionado.autor}</p>
                            <p>Género: {libroSeleccionado.genero}</p>
                            <p>Descripción del libro: {libroSeleccionado.descripcion}</p>

                            <button onClick={cerrarModal}>Cerrar</button>
                        </div>
                    )}
                </Modal>
            </style>
        </>

    );
};