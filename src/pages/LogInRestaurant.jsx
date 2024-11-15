import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from "axios";
import API_BASE_URL from '../config';

const LogInRestaurant = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/loginrestaurant`, {
                email,
                contraseña,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setError(null);
            navigate('/Reserves');
        } catch (error) {
            setError(error.response ? error.response.data : 'Error al iniciar sesión');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Bienvenido a MesaYa</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>
                </Form.Group>
                <div className="d-grid">
                    <Button type='submit' variant="primary" size="lg">Iniciar Sesión</Button>
                </div>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="text-center mt-3">
                <Link to="/RegisterRestaurant">No estoy registrado</Link>
            </div>
        </Container>
    )
}

export default LogInRestaurant;