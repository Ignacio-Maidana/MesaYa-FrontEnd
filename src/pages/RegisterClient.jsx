import React from "react";
import { Container, Form, Button } from 'react-bootstrap';

const RegisterClient = () => {
    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Crea tu cuenta en MesaYa!</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Apellido" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="tel" placeholder="Telefono" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Dirección" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
                <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit">Registrarme</Button>
                </div>
            </Form>
        </Container>
    )
}

export default RegisterClient;