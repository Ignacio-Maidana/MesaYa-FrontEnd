import React from "react";
import {Link} from 'react-router-dom'

const RegisterRestaurant = () => {
    return (
        <>
            <h2>Crea tu cuenta en MesaYa!</h2>
            <form action="">
                <input type="text" placeholder="Nombre"/>
                <input type="text" placeholder="CUIT"/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Telefono"/>
                <input type="text" placeholder="Dirección"/>
                <input type="password" placeholder="Contraseña"/>
                <input type="text" placeholder="Categoría"/>
                <div className="pictureRestaurant">
                    <strong>Foto del Restaurant</strong>
                    <img src="" alt="" />
                    <button>Subir</button>
                    <button>Borrar</button>
                </div>
                <Link to='/Reserves'><button>Registrarme</button></Link>
            </form>
        </>
    )
}

export default RegisterRestaurant