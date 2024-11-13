import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';

const RegisterClient = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        try {
            const response = await axios.post('http://localhost:8000/api/clientes', {
                nombre,
                apellido,
                email,
                telefono,
                direccion,
                contraseña,
                localidad,
                provincia
            });
            // Aquí podrías redirigir al usuario a otra página después de registrarse
            navigate('/LogInClient'); // Redirige a la página de inicio de sesión
        } catch (error) {
            setError(error.response ? error.response.data : 'Error al registrarse');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Crea tu cuenta en MesaYa!</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="tel" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)}/>
                </Form.Group>
                <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit">Registrarme</Button>
                </div>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Container>
    )
}

export default RegisterClient;