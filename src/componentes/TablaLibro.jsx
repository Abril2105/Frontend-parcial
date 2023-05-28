import { useState } from "react";

export const TablaLibro = ({ listaLibros }) => {

    const informacion = (event) => {



    }
    const [buscarGen, setBuscarGen] = useState("");
    const [buscarTitulo, setBuscarTitulo] = useState("");
    const [buscarAutor, setBuscarAutor] = useState("");

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
            document.getElementById("buscarAutor").disabled = true;
            document.getElementById("buscarGenero").disabled = true;
            document.getElementById("buscarTitulo").disabled = false;
            setBuscarAutor("");
            setBuscarGen("");
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
        if (gen.length > 0) {
            document.getElementById("buscarAutor").disabled = true;
            document.getElementById("buscarGenero").disabled = false;
            document.getElementById("buscarTitulo").disabled = true;
            setBuscarTitulo("");
            setBuscarAutor("");
        } else {
            document.getElementById("buscarGenero").disabled = true;
        }
    }

    return (
        <>
            <form onSubmit={buscarLibTitulo} style={{ backgroundColor: "#AD9978" }}>
                <h2 id ="Busquedas" className="text-left text-dark " style={{ fontSize: "50px", backgroundColor: "#AD9978" }}>Busquedas</h2>
                <div className="form-group input-group">
                    <label class="input-group-text futurama " for="inputGroupSelect01" >Titulo</label>
                    <input type="text" className="form-control" id="busquedaTitulo" placeholder="Titulo" value={buscarTitulo} onChange={(event) => { setBuscarTitulo(event.target.value); habilitarButtonTitulo(); }} />
                    <br></br>
                    <button id="buscarTitulo" type="submit" class="btn btn-dark" disabled> Buscar
                    </button>
                </div>
            </form>
            <form onSubmit={buscarLibAutor} style={{ backgroundColor: "#AD9978" }}>
                <div className="form-group input-group">
                <label id="labelBusqueda" class="input-group-text futurama " for="inputGroupSelect01" >Autor</label>
                <input type="text" className="form-control" id="busquedaAutor" placeholder="Autor" value={buscarAutor} onChange={(event) => { setBuscarAutor(event.target.value); habilitarButtonAutor(); }} />
                    <br></br>
                    <button id="buscarAutor" type="submit" class="btn btn-dark" disabled> Buscar
                    </button>
                </div>
            </form>

            <form onSubmit={buscarLibGen} className="color">
                <div className="form-floating">
                    <br></br>
                    <select class="form-select" id="busquedaGenero" value={buscarGen} onChange={(event) => { setBuscarGen(event.target.value); habilitarButtonGenero(); }}>
                            <option value = "" selected>Seleccione un genero</option>
                            <option value="Ficcion">Ficcion</option>
                            <option value="Novela">Novela</option>
                            <option value="Suspenso">Suspenso</option>
                            <option value="Fantasia">Fantasia</option>
                            <option value="Romance">Romance</option>
                            <option value="Historia">Historia</option>
                        </select>
                        <label id = "gen" for="floatingSelect">Genero</label>
                    <br></br>
                    <button id="buscarGenero" type="submit" class="btn btn-dark" disabled> Buscar
                    </button>
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
                    .futurama{
                        background-color: #222;
                        color: #fff;
                        padding: 8px 12px;
                        border-radius: 4px;
                        font-family: 'Arial', sans-serif;
                        font-size: 14px;
                        text-transform: uppercase;
                    }
                    #busquedaAutor {
                        margin-top: 25px
                    }
                    #labelBusqueda {
                        margin-top: 25px
                    }
                    #buscarAutor {
                        margin-top: 25px
                    }
                    #gen {
                        margin-top: 24px
                    }
                    #buscarGenero {
                        margin-bottom: 20px
                    }
                    `}
            </style>
        </>
    );
};