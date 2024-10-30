import React from "react";
import {Link} from 'react-router-dom'

const RestaurantItem = () => {

    return (
        <>
            <img src="" alt="" />
            <h3>Restaurante - Nombre</h3>
            <strong>Dirección</strong>
            <strong>Teléfono</strong>
            <Link to='/Reserve'><button>Reservar</button></Link>
        </>
    )
}

export default RestaurantItem