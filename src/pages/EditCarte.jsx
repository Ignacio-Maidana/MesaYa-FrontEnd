import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Card, Button, Row, Col } from 'react-bootstrap';

const EditCarte = () => {
    return (
        <Container>
            <Nav className="justify-content-center mb-4">
                <Nav.Item><Nav.Link href="#">Categoria 1</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="#">Categoria 2</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="#">Categoria 3</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="#">Categoria 4</Nav.Link></Nav.Item>
            </Nav>
            <Row>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300x200" alt="Plato 1" />
                        <Card.Body>
                            <Card.Title>Plato 1</Card.Title>
                            <Card.Text>Descripción del Plato 1</Card.Text>
                            <Card.Text className="text-primary">Precio: $15.99</Card.Text>
                            <Button variant="danger" className="me-2">Borrar</Button>
                            <Button variant="primary">Editar</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300x200" alt="Plato 2" />
                        <Card.Body>
                            <Card.Title>Plato 2</Card.Title>
                            <Card.Text>Descripción del Plato 2</Card.Text>
                            <Card.Text className="text-primary">Precio: $12.99</Card.Text>
                            <Button variant="danger" className="me-2">Borrar</Button>
                            <Button variant="primary">Editar</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300x200" alt="Plato 3" />
                        <Card.Body>
                            <Card.Title>Plato 3</Card.Title>
                            <Card.Text>Descripción del Plato 3</Card.Text>
                            <Card.Text className="text-primary">Precio: $18.99</Card.Text>
                            <Button variant="danger" className="me-2">Borrar</Button>
                            <Button variant="primary">Editar</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="text-center mt-4">
                <Link to="/Reserves"><Button variant="secondary">Volver</Button></Link>
            </div>
        </Container>
    )
}

export default EditCarte;