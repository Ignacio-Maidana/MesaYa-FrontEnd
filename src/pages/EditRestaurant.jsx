import React from "react";
import { Link } from 'react-router-dom';
import { Container, Form, Button, Image } from 'react-bootstrap';

const EditRestaurant = () => {
    return (
        <Container>
            <h2 className="my-4">Editar Restaurant</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="CUIT" />
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
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Categoría" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Foto del Restaurant</Form.Label>
                    <Image src="https://via.placeholder.com/300x200" thumbnail className="mb-2" />
                    <div>
                        <Button variant="primary" className="me-2">Subir</Button>
                        <Button variant="danger">Borrar</Button>
                    </div>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Link to='/Reserves'><Button variant="primary" className="me-2">Guardar</Button></Link>
                    <Link to='/Reserves'><Button variant="secondary">Cancelar</Button></Link>
                </div>
            </Form>
        </Container>
    )
}

export default EditRestaurant;