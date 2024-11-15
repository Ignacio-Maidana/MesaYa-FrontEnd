import React, { useState, useEffect } from "react";
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

const Pay = () => {
    const { id } = useParams(); // Suponiendo que pasas el ID de la reserva en la URL como parámetro
    const [reserva, setReserva] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/reservas/${id}`);
                setReserva(response.data);
            } catch (error) {
                console.error('Error al obtener la reserva:', error);
            }
        };

        fetchReserva();
    }, [id]);

    const handlePago = async () => {
        try {
            await axios.post(`${API_BASE_URL}/reservas/${id}/pagar`);
            // Maneja la confirmación del pago (e.g., redirigir a otra página)
            navigate('/Catalog');
        } catch (error) {
            console.error('Error al procesar el pago:', error);
        }
    };

    if (!reserva) {
        return <p>Cargando...</p>;
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header as="h2">Tu Reserva</Card.Header>
                <Card.Body>
                    <Card.Title>Restaurant - {reserva.nombreRestaurante}</Card.Title>
                    <Card.Text>
                        <strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}<br />
                        <strong>Hora:</strong> {reserva.hora}<br />
                        <strong>Nro Mesa:</strong> {reserva.numeroMesa}<br />
                        <strong>Cantidad de personas:</strong> {reserva.cantidadPersonas}<br />
                        <strong>Monto a Pagar:</strong> ${reserva.monto}
                    </Card.Text>
                    <Button variant="primary" className="me-2" onClick={handlePago}>Pagar</Button>
                    <Button variant="secondary" onClick={() => navigate('/Reserves')}>Cancelar</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Pay;