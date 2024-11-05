import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';

const EditTables = () => {
    return (
        <Container>
            <Form className="my-4">
                <Form.Group className="mb-3">
                    <Form.Select>
                        <option>Mesa N° 1</option>
                        <option>Mesa N° 2</option>
                        <option>Mesa N° 3</option>
                        <option>Mesa N° 4</option>
                        <option>Mesa N° 5</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mesa:</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Habilitada para:</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Button variant="primary" className="me-2">Agregar Nueva Mesa</Button>
                <Button variant="success" className="me-2">Guardar</Button>
                <Link to='/Reserves'><Button variant="secondary">Volver</Button></Link>
            </Form>
        </Container>
    )
}

export default EditTables;