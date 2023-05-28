import { useState } from "react";

export const TablaLibro = ({ listaLibros }) => {

    const informacion = (event) => {



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
        const idCell = row.querySelector('td:first-child');//toma la primera data de el respectivo row lo que seria el id
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
        return listaLibros.filter((libro) => libro.genero == genero)
    }

    const buscarLibroPorTitulo = (titulo) => {
        return listaLibros.filter((libro) => libro.titulo == titulo)
    }

    const buscarLibroPorAutor = (autor) => {
        return listaLibros.filter((libro) => libro.autor == autor)
    }

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
    };

    function habilitarButtonTitulo() {
        var titu = document.getElementById("busquedaTitulo").value
        if (titu.length > 0) {
            document.getElementById("buscarTitulo").disabled = false;
        } else {
            document.getElementById("buscarTitulo").disabled = true;
        }
    }

    function habilitarButtonAutor() {
        var auto = document.getElementById("busquedaAutor").value
        if (auto.length > 0) {
            document.getElementById("buscarAutor").disabled = false;
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

    function volverTitulo() {
        document.getElementById("busquedaTipo").style.display = "block"
        document.getElementById("busTitulo").style.display = "none"
        document.getElementById("busquedaTitulo").style.display = "none"
        document.getElementById("buscarTitulo").style.display = "none"
        document.getElementById("volverTitulo").style.display = "none"
        document.getElementById("floatingBus").style.display = "block"
        setBusqueda("");
    }

    function volverAutor() {
        document.getElementById("busquedaTipo").style.display = "block"
        document.getElementById("busAutor").style.display = "none"
        document.getElementById("busquedaAutor").style.display = "none"
        document.getElementById("buscarAutor").style.display = "none"
        document.getElementById("volverAutor").style.display = "none"
        document.getElementById("floatingBus").style.display = "block"
        setBusqueda("");
    }

    function volverGenero() {
        document.getElementById("busquedaTipo").style.display = "block"
        document.getElementById("busGenero").style.display = "none"
        document.getElementById("busquedaGenero").style.display = "none"
        document.getElementById("buscarGenero").style.display = "none"
        document.getElementById("volverGenero").style.display = "none"
        document.getElementById("floatingBus").style.display = "block"
        setBusqueda("");
    }

    return (
        <>
            <form style={{ backgroundColor: "#AD9978" }}>
            <h2 id="Busquedas" className="text-left text-dark" style={{ fontSize: "50px", backgroundColor: "#AD9978", margin: "0", padding: "0" }}>Busquedas</h2>
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
            </form>

            <form onSubmit={buscarLibTitulo} style={{ backgroundColor: "#AD9978" }}>
                <div className="form-group input-group">
                    <label style={{ display: "none" }} id="busTitulo" class="input-group-text futurama " for="inputGroupSelect01" >Titulo</label>
                    <input style={{ display: "none" }} type="text" className="form-control" id="busquedaTitulo" placeholder="Titulo" value={buscarTitulo} onChange={(event) => { setBuscarTitulo(event.target.value); habilitarButtonTitulo(); }} />
                    <button style={{ display: "none" }} id="buscarTitulo" type="submit" class="btn btn-dark" disabled> Buscar</button>
                    <button style={{ display: "none" }} id="volverTitulo" type="submit" class="btn btn-dark" onClick={volverTitulo}> Volver</button>
                </div>
            </form>

            <form onSubmit={buscarLibAutor} style={{ backgroundColor: "#AD9978" }}>
                <div className="form-group input-group">
                    <label style={{ display: "none" }} id="busAutor" class="input-group-text futurama " for="inputGroupSelect01" >Autor</label>
                    <input style={{ display: "none" }} type="text" className="form-control" id="busquedaAutor" placeholder="Autor" value={buscarAutor} onChange={(event) => { setBuscarAutor(event.target.value); habilitarButtonAutor(); }} />
                    <button style={{ display: "none" }} id="buscarAutor" type="submit" class="btn btn-dark" disabled> Buscar</button>
                    <button style={{ display: "none" }} id="volverAutor" type="submit" class="btn btn-dark" onClick={volverAutor}> Volver</button>
                </div>
            </form>

            <form onSubmit={buscarLibGen} style={{ backgroundColor: "#AD9978" }}>
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
                LibrosEncontradosGen.length > 0 || LibrosEncontradosTitulo.length > 0 || LibrosEncontradosAutor.length > 0 ? (
                    <div>
                        <h3>Libros encontrados:</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id Libro</th>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Autor</th>
                                    <th scope="col">Genero</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LibrosEncontradosGen.map((libro, index) => (
                                    <tr key={index}>
                                        <td>{libro.id}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                    </tr>
                                ))}
                                {LibrosEncontradosTitulo.map((libro, index) => (
                                    <tr key={index}>
                                        <td>{libro.id}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                    </tr>
                                ))}
                                {LibrosEncontradosAutor.map((libro, index) => (
                                    <tr key={index}>
                                        <td>{libro.id}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-info" onClick={limpiarBusqueda}> Limpiar búsqueda
                        </button>
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
                                    <tr key={libro.genero}>
                                        <td>{libro.id}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={informacion}> Informacion
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={deleteRow}> Eliminar
                                            </button>
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
                    
                    `}
                </style>
        </>
    );
};