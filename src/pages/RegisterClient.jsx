import React from "react";

const RegisterClient = () => {
    return (
        <>
            <h2>Crea tu cuenta en MesaYa!</h2>
            <form action="">
                <input type="text" placeholder="Nombre"/>
                <input type="text" placeholder="Apellido"/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Telefono"/>
                <input type="text" placeholder="Dirección"/>
                <input type="password" placeholder="Contraseña"/>
                <button>Registrarme</button>
            </form>
        </>
    )
}

export default RegisterClient