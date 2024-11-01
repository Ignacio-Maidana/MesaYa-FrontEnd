import React from "react";
import { Link } from "react-router-dom";

const Plates = () => {
    return (
        <>
            <div>
                <input type="text" placeholder="Plato"/>
                <button>Agregar</button>
            </div>
            <input type="text" placeholder="Nombre"/>
            <input type="text" placeholder="Precio"/>
            <input type="text" placeholder="Descripcion"/>
            <input type="text" placeholder="Categoria"/>
            <button>Guardar</button>
            <Link to="/Reservers"><button>Volver</button></Link>
        </>
    )
}

export default Plates