import backgroundImage from '../biblioteca.jpg';
import principito from '../principito.jpg';
import caperucita from '../caperucita.jpg';
import donquijote from '../donquijote.jpg';
import '../estilo.css'

export const HomeLibro = () => {

    return (
        <><div
            style={{
                backgroundColor: "#AD9978"
            }}
        >
            <div className="fondo" >
            </div><>
            <h1 className="text-center" style={{
                        fontSize: "60px", backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        fontWeight: "bold",
                        color: "#B4A57A",
                        height: "30vh",
                    }}><br />BIENVENIDOS</h1>
                <h2 style={{ textAlign: "center", color: "white", }}>Libros destacados</h2>
                <div className="contenedor">
                    <article className="destacados">
                        <br />
                        <div className="libro">
                            <figure>
                                <img src={principito} alt="principitp" className="img1" />
                                <h4>Principito</h4>
                                <small><p>Es una famosa novela corta escrita por Antoine de Saint-Exupéry. Cuenta la historia de un pequeño príncipe que viaja de planeta en planeta y se encuentra con diferentes personajes, incluyendo un piloto que ha aterrizado en el desierto del Sahara​</p></small>
                            </figure>
                        </div>
                        <div className="libro">
                            <figure>
                                <img src={caperucita} alt="principitp" className="img1" />
                                <h4>Caperucita Roja</h4>
                                <small><p> Es un famoso cuento de hadas europeo que narra la historia de una niña llamada Caperucita Roja. Caperucita Roja es enviada por su madre a llevar una cesta de comida a su abuela. En el camino, se encuentra con el lobo feroz, quien la engaña.</p></small>
                            </figure>
                        </div>
                        <div className="libro">
                            <figure>
                                <img src={donquijote} alt="principitp" className="img1" />
                                <h4>Don Quijojte</h4>
                                <small><p>El libro relata las aventuras y desventuras de un hidalgo de 50 años llamado Alonso Quijano, quien decide ser un caballero andante como aquellos que aparecen en sus libros de caballerías favoritos​</p></small>
                            </figure>
                        </div>

                    </article>
                </div></></div></>
    );
}