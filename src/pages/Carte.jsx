import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import API_BASE_URL from '../config';

const Carte = () => {
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/platos`);
                setPlatos(response.data);
            } catch (error) {
                console.error('Error al obtener los platos:', error);
            }
        };

        fetchPlatos();
    }, []);

    return (
        <Container>
            <Row>
                {platos.map((plato) => (
                    <Col md={4} className="mb-4" key={plato.idPlato}>
                        <Card>
                            <Card.Img variant="top" src={plato.imagen || "https://via.placeholder.com/300x200"} alt={plato.nombre} />
                            <Card.Body>
                                <Card.Title>{plato.nombre}</Card.Title>
                                <Card.Text>{plato.descripcion}</Card.Text>
                                <Card.Text className="text-primary">${plato.precio}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Carte;