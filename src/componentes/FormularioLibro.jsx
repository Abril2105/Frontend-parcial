import { useState } from "react"

export const FormularioLibro = ({ agregar }) => {
    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const guardarLibro = () => {
        let libro = {
            id: id,
            titulo: titulo,
            autor: autor,
            genero: genero,
            descripcion: descripcion
        }
        agregar(libro)
        setId("");
        setTitulo("");
        setAutor("");
        setGenero("");
        setDescripcion("");
    }

    function habilitarButton() {
        var titu = document.getElementById("titulo").value
        var auto = document.getElementById("autor").value
        var gen = document.getElementById("genero").value
        var des = document.getElementById("descripcion").value
        if (titu == "") {
            document.getElementById("registrar").disabled = true;
        } else if (auto == "") {
            document.getElementById("registrar").disabled = true;
        } else if (gen == "") {
            document.getElementById("registrar").disabled = true;
        } else if (des == "") {
            document.getElementById("registrar").disabled = true;
        } else {
            document.getElementById("registrar").disabled = false;
        }
    }

    return (
        <>
            <div>
                <form onSubmit={guardarLibro} style={{ backgroundColor: "#AD9978" }}>
                    <h1 className="text-center text-dark " style={{ fontSize: "100px", backgroundColor: "#AD9978" }}>BIBLIOTECA</h1>

                    <h2 id ="Busquedas" className="text-left text-dark " style={{ fontSize: "50px", backgroundColor: "#AD9978" }}>Registros</h2>

                    <div className="form-group input-group">
                        <label class="input-group-text futurama " for="inputGroupSelect01" >Titulo</label>
                        <input type="text" className="form-control" id="titulo" placeholder="Titulo" value={titulo} onChange={(event) => { setTitulo(event.target.value); habilitarButton(); }}/>
                    </div>
                    <br />
                    <div className="form-group input-group ">
                        <label class="input-group-text futurama" for="inputGroupSelect01">Autor</label>
                        <input type="text" className="form-control" id="autor" placeholder="Autor" value={autor} onChange={(event) => { setAutor(event.target.value); habilitarButton(); }}/>
                    </div>
                    <br />
                    <div className="form-group input-group ">
                        <label class="input-group-text futurama" for="inputGroupSelect01">Descripcion del libro</label>
                        <input type="text" className="form-control" id="descripcion" placeholder="Descripcion" value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
                    </div>



                    <br />
                    <div className="form-floating">
                        <select class="form-select" id="genero" value={genero} onChange={(event) => { setGenero(event.target.value); habilitarButton(); }}>
                            <option value = "" selected>Seleccione un genero</option>
                            <option value="Ficcion">Ficcion</option>
                            <option value="Novela">Novela</option>
                            <option value="Suspenso">Suspenso</option>
                            <option value="Fantasia">Fantasia</option>
                            <option value="Romance">Romance</option>
                            <option value="Historia">Historia</option>

                        </select>
                        <label for="floatingSelect">Genero</label>
                    </div>
                    <br />

                    <button id="registrar" type="submit" class="btn btn-dark" disabled>Registrar</button>
                </form>
            </div>

            <style>

                {`
                 ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          ::-webkit-scrollbar-thumb {
            background: #505050;
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
          #registrar {
            margin-bottom: 20px
          }

        `}

            </style>
        </>
    )
}