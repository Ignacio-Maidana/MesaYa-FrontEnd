import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const EditCarte = () => {
    const [platos, setPlatos] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const restaurantId = localStorage.getItem('restaurantId'); // Obtener el ID del restaurante del localStorage

    useEffect(() => {
        // Llama a la API para obtener los platos del restaurante
        const fetchPlatos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/platos`);
                setPlatos(response.data);
            } catch (error) {
                console.error("Error al obtener los platos", error);
            }
        };

        // Llama a la API para obtener las bebidas del restaurante
        const fetchBebidas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/bebidas`);
                setBebidas(response.data);
            } catch (error) {
                console.error("Error al obtener las bebidas", error);
            }
        };

        fetchPlatos();
        fetchBebidas();
    }, [restaurantId]);

    // Manejar la eliminación de un plato
    const handleDeletePlato = async (platoId) => {
        try {
            await axios.delete(`http://localhost:8000/api/platos/${platoId}`);
            setPlatos(platos.filter(plato => plato.idPlato !== platoId));
        } catch (error) {
            console.error("Error al eliminar el plato", error);
        }
    };

    // Manejar la eliminación de una bebida
    const handleDeleteBebida = async (bebidaId) => {
        try {
            await axios.delete(`http://localhost:8000/api/bebidas/${bebidaId}`);
            setBebidas(bebidas.filter(bebida => bebida.idBebida !== bebidaId));
        } catch (error) {
            console.error("Error al eliminar la bebida", error);
        }
    };

    return (
        <Container>
            <h2 className="my-4">Editar Carta</h2>
            <h3>Platos</h3>
            <Row>
                {platos.map((plato) => (
                    <Col md={4} className="mb-4" key={plato.idPlato}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{plato.nombre}</Card.Title>
                                <Card.Text>{plato.descripcion}</Card.Text>
                                <Card.Text className="text-primary">Precio: ${plato.precio}</Card.Text>
                                <Button variant="danger" className="me-2" onClick={() => handleDeletePlato(plato.idPlato)}>
                                    Borrar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h3>Bebidas</h3>
            <Row>
                {bebidas.map((bebida) => (
                    <Col md={4} className="mb-4" key={bebida.idBebida}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{bebida.nombre}</Card.Title>
                                <Card.Text>{bebida.descripcion}</Card.Text>
                                <Card.Text className="text-primary">Precio: ${bebida.precio}</Card.Text>
                                <Button variant="danger" className="me-2" onClick={() => handleDeleteBebida(bebida.idBebida)}>
                                    Borrar
                                </Button>
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