import React from "react";
import {Link} from 'react-router-dom'

const LogInRestaurant = () => {

    return(
        <>
            <h2>Bienvenido a MesaYa</h2>
            <form action="">
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Contraseña"/>
                <Link to='/Reserves'><button>Iniciar Sesión</button></Link>
            </form>
            <a href="./RegisterRestaurant">No estoy registrado</a>
        </>
    )
}

export default LogInRestaurant