import React from "react";
import {Link} from 'react-router-dom'

const LogInCliente = () => {

    return(
        <>
            <h2>Bienvenido a MesaYa</h2>
            <form action="">
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Contraseña"/>
                <Link to='/Catalog'><button>Iniciar Sesión</button></Link>
            </form>
            <a href="./RegisterClient">No estoy registrado</a>
        </>
    )
}

export default LogInCliente