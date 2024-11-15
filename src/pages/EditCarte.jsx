import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Nav, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import API_BASE_URL from '../config';

const EditCarte = () => {
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        const fetchDishesAndCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/platos`);
                setPlatos(response.data);
            } catch (error) {
                console.error("Error al obtener los platos y categorías", error);
            }
        };
        fetchDishesAndCategories();
    }, []);

    const handleDelete = async (platoId) => {
        try {
            await axios.delete(`${API_BASE_URL}/platos/${platoId}`);
            setPlatos(platos.filter(plato => plato.idPlato !== platoId));
        } catch (error) {
            console.error("Error al eliminar el plato", error);
        }
    };

    return (
        <Container>
            <Row>
                {platos.map((plato) => (
                    <Col md={4} className="mb-4" key={plato.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{plato.nombre}</Card.Title>
                                <Card.Text>{plato.descripcion}</Card.Text>
                                <Card.Text className="text-primary">Precio: ${plato.precio}</Card.Text>
                                <Button variant="danger" className="me-2" onClick={() => handleDelete(plato.idPlato)}>
                                    Borrar
                                </Button>
                                <Button variant="primary">Editar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center mt-4">
                <Link to="/Reserves">
                    <Button variant="secondary">Volver</Button>
                </Link>
            </div>
        </Container>
    );
}

export default EditCarte;