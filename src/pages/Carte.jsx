import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Nav, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Carte = () => {
    const [platos, setPlatos] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const { id } = useParams(); // Obtener el ID del restaurante de la URL
    const location = useLocation();
    const restaurant = location.state?.restaurant;

    // Referencias a los apartados de platos y bebidas
    const platosRef = useRef(null);
    const bebidasRef = useRef(null);

    useEffect(() => {
        // Obtener los platos del restaurante
        const fetchPlatos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${id}/platos`);
                setPlatos(response.data);
            } catch (error) {
                console.error("Error al obtener los platos", error);
            }
        };

        // Obtener las bebidas del restaurante
        const fetchBebidas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${id}/bebidas`);
                setBebidas(response.data);
            } catch (error) {
                console.error("Error al obtener las bebidas", error);
            }
        };

        fetchPlatos();
        fetchBebidas();
    }, [id]);

    // Función para manejar la navegación a los apartados
    const handleNavClick = (section) => {
        if (section === 'platos' && platosRef.current) {
            platosRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'bebidas' && bebidasRef.current) {
            bebidasRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Container>
            <h2 className="my-4">Carta de {restaurant?.nombre}</h2>
            <Nav className="justify-content-center mb-4">
                <Nav.Item>
                    <Nav.Link href="#platos" onClick={() => handleNavClick('platos')}>Platos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#bebidas" onClick={() => handleNavClick('bebidas')}>Bebidas</Nav.Link>
                </Nav.Item>
            </Nav>
            <h3 ref={platosRef}>Platos</h3>
            <Row>
                {platos.map((plato) => (
                    <Col md={4} className="mb-4" key={plato.idPlato}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{plato.nombre}</Card.Title>
                                <Card.Text>{plato.descripcion}</Card.Text>
                                <Card.Text className="text-primary">Precio: ${plato.precio}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h3 ref={bebidasRef}>Bebidas</h3>
            <Row>
                {bebidas.map((bebida) => (
                    <Col md={4} className="mb-4" key={bebida.idBebida}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{bebida.nombre}</Card.Title>
                                <Card.Text>{bebida.descripcion}</Card.Text>
                                <Card.Text className="text-primary">Precio: ${bebida.precio}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Carte;