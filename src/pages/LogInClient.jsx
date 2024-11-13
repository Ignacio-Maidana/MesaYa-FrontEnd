import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from "axios";

const LogInCliente = () => {

    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado de recargar la página
    
        try {
            const response = await axios.post('http://localhost:8000/api/logincliente', {
                email,
                contraseña,
            });
            const token = response.data.token;
            localStorage.setItem('token', token); // Guarda el token en localStorage
            setError(null); // Limpia cualquier error previo
            navigate('/Catalog'); // Redirige a la página de catálogo
        } catch (error) {
            setError(error.response ? error.response.data : 'Error al iniciar sesión');
        }
    };

    return(
        <Container className="mt-5">
            <h2 className="text-center mb-4">Bienvenido a MesaYa</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>
                </Form.Group>
                <div  className="d-grid">
                    <Button type="submit" variant="primary" size="lg">Iniciar Sesión</Button>
                </div>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="text-center mt-3">
                <Link to="/RegisterClient">No estoy registrado</Link>
            </div>
        </Container>
    )
}

export default LogInCliente;