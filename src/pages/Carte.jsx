import React from "react";
import { Nav, Card, Container, Row, Col } from 'react-bootstrap';

const Carte = () => {
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
                            <Card.Text className="text-primary">$15.99</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300x200" alt="Plato 2" />
                        <Card.Body>
                            <Card.Title>Plato 2</Card.Title>
                            <Card.Text>Descripción del Plato 2</Card.Text>
                            <Card.Text className="text-primary">$12.99</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300x200" alt="Plato 3" />
                        <Card.Body>
                            <Card.Title>Plato 3</Card.Title>
                            <Card.Text>Descripción del Plato 3</Card.Text>
                            <Card.Text className="text-primary">$18.99</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300x200" alt="Plato 4" />
                        <Card.Body>
                            <Card.Title>Plato 4</Card.Title>
                            <Card.Text>Descripción del Plato 4</Card.Text>
                            <Card.Text className="text-primary">$14.99</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300x200" alt="Plato 5" />
                        <Card.Body>
                            <Card.Title>Plato 5</Card.Title>
                            <Card.Text>Descripción del Plato 5</Card.Text>
                            <Card.Text className="text-primary">$16.99</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/300x200" alt="Plato 6" />
                        <Card.Body>
                            <Card.Title>Plato 6</Card.Title>
                            <Card.Text>Descripción del Plato 6</Card.Text>
                            <Card.Text className="text-primary">$13.99</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Carte;