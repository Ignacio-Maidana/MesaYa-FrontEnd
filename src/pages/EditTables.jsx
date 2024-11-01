import React from "react";
import { Link } from "react-router-dom";

const EditTables = () => {
    return (
        <>
        <select name="" id="">
            <option value="">Mesa N° XX</option>
        </select>
        <label htmlFor="">Mesa:</label> <input type="text" name="" id="" />
        <label htmlFor="">Habilitada para:</label> <input type="text" name="" id="" />
        <button>Agregar Nueva Mesa</button>
        <button>Guardar</button>
        <Link to='/Reserves'><button>Volver</button></Link>
        </>
    )
}

export default EditTables