import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, InputGroup } from 'react-bootstrap';

const Plates = () => {
    return (
        <Container className="mt-5">
            <InputGroup className="mb-3">
                <Form.Control type="text" placeholder="Plato" />
                <Button variant="outline-secondary">Agregar</Button>
            </InputGroup>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Precio" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Descripcion" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Categoria" />
                </Form.Group>
                <Button variant="primary" className="me-2">Guardar</Button>
                <Link to="/Reservers"><Button variant="secondary">Volver</Button></Link>
            </Form>
        </Container>
    )
}

export default Plates;