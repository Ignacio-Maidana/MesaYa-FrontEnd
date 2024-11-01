import React from "react";
import { Link } from "react-router-dom";

const EditCarte = () => {
    return (
        <>        
            <div>
                <a href="">Categoria 1</a>
                <a href="">Categoria 2</a>
                <a href="">Categoria 3</a>
                <a href="">Categoria 4</a>
            </div>
            <div>
                <h2>Plato XXX</h2>
                <h4>Descripcion</h4>
                <img src="" alt="" />
                <button>Borrar</button>
                <h3>Precio: $XXX,XX</h3>
            </div>
            <Link to="/Reserves"><button>Volver</button></Link>
        </>
    )
}

export default EditCarte