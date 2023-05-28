import { useState } from "react";

export const TablaLibro = ({ listaLibros }) => {

    const editar = (event) => {



    }
    const [buscarGen, setBuscarGen] = useState("");

    const [LibrosEncontradosGen, setLibrosEncontradosGen] = useState([]);

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



    const buscarLibGen = (event) => {
        event.preventDefault();
        const LibrosEncontrados = buscarLibroPorGenero(buscarGen);
        setLibrosEncontradosGen(LibrosEncontrados);
    };



    const limpiarBusqueda = () => {

        setBuscarGen("");

        setLibrosEncontradosGen([]);
    };

    return (
        <>
            <form onSubmit={buscarLibGen}>
                <br />
                <div className="form-group input-group">


                    <br></br>
                    <select ClassName="form-control" id="genero" placeholder="genero" value={buscarGen} onChange={(event) => setBuscarGen(event.target.value)}>
                        <option value="">--Seleccione el genero--</option>
                        <option value="Ficcion">Ficcion</option>
                        <option value="Novela">Novela</option>
                        <option value="Suspenso">Suspenso</option>
                        <option value="Fantasia">Fantasia</option>
                        <option value="Romance">Romance</option>
                        <option value="Historia">Historia</option>
                    </select>
                    <br></br>
                    <button type="submit" className="btn btn-primary"> Buscar
                    </button>
                </div>
            </form>

            {
                LibrosEncontradosGen.length > 0 ? (

                    <div>
                        <h3>Libro encontrado:</h3>
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
                                        <td>{libro.titulo}</td>
                                        <td>{libro.autor}</td>
                                        <td>{libro.genero}</td>
                                        <td>
                                        </td>
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
                                    <th scope="col">Modificar</th>
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
                                            <button className="btn btn-success" onClick={editar}> Editar
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
        </>
    );
};