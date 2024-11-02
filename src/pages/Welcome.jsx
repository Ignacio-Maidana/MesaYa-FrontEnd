import React from "react";
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Welcome = () => {
    return (
        <Container className="text-center mt-5">
            <h1>Bienvenido a MesaYa</h1>
            <div className="d-flex justify-content-center mt-4">
                <Link to='/LogInClient'>
                    <Button variant="primary" className="me-3">Soy Cliente</Button>
                </Link>
                <Link to='/LogInRestaurant'>
                    <Button variant="primary">Soy Restaurante</Button>
                </Link>
            </div>
        </Container>
    );
}

export default Welcome;
