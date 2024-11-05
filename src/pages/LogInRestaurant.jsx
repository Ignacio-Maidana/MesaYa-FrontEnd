import React from "react";
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const LogInRestaurant = () => {
    return(
        <Container className="mt-5">
            <h2 className="text-center mb-4">Bienvenido a MesaYa</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
                <div className="d-grid">
                    <Link to='/Reserves'><Button variant="primary" size="lg">Iniciar Sesión</Button></Link>
                </div>
            </Form>
            <div className="text-center mt-3">
                <Link to="./RegisterRestaurant">No estoy registrado</Link>
            </div>
        </Container>
    )
}

export default LogInRestaurant;