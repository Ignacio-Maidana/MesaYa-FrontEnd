import React from "react";
import {Link } from 'react-router-dom'

const Welcome = () => {
    return(
        <>
            <h1>Bienvenido a MesaYa</h1>
            <div className="buttons">
                <Link to='/LogInClient'><button>Soy Cliente</button></Link>
                <Link to='/LogInRestaurant'><button>Soy Restaurante</button></Link>
            </div>
        </>
    )
}

export default Welcome