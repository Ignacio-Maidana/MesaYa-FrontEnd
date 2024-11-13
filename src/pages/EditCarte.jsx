import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Nav, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const EditCarte = () => {
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        // Llama a la API para obtener las categorías y los platos
        const fetchDishesAndCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/platos"); // Cambia la URL según tu API
                console.log(response.data); // Verifica la estructura de datos
                setPlatos(response.data);
            } catch (error) {
                console.error("Error al obtener los platos y categorías", error);
            }
        };
        fetchDishesAndCategories();
    }, []);

    const handleDelete = async (platoId) => {
        try {
            await axios.delete(`http://localhost:8000/api/platos/${platoId}`); // Cambia la URL según tu API
            setPlatos(platos.filter(plato => plato.idPlato !== platoId)); // Ajusta `dish.id` si el campo de ID es diferente
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