import React from "react";
import { Container, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { reservationData } = location.state || {};
    const { restaurant, selectedDate, selectedTime, selectedTable } = reservationData || {};

    const handlePay = async () => {
        try {
            // Obtener el ID del cliente desde el localStorage
            const idCliente = localStorage.getItem('clientId');
            if (!idCliente) {
                throw new Error("ID del cliente no encontrado en el localStorage");
            }

            // Crear la reserva en el backend
            const reservaData = {
                fecha: selectedDate,
                horario: selectedTime,
                idMesa: selectedTable.idMesa,
                idCliente: parseInt(idCliente, 10), // Asegurarse de que el ID del cliente sea un número
                idRestaurant: restaurant.idRestaurant
            };
            await axios.post('http://localhost:8000/api/reservas', reservaData);

            // Actualizar el estado de la mesa a "ocupado"
            await axios.put(`http://localhost:8000/api/mesas/${selectedTable.idMesa}`, {
                ...selectedTable,
                estado: 'ocupado'
            });

            // Redirigir a la página de reservas
            navigate(`/Reserve/${restaurant.idRestaurant}`);
        } catch (error) {
            console.error("Error al crear la reserva o actualizar el estado de la mesa:", error);
        }
    };

    const handleCancel = () => {
        navigate(`/Reserve/${restaurant.idRestaurant}`);
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header as="h2">Tu Reserva</Card.Header>
                <Card.Body>
                    <Card.Title>{restaurant?.nombre}</Card.Title>
                    <Card.Text>
                        <strong>Fecha:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'No seleccionada'}<br />
                        <strong>Hora:</strong> {selectedTime || 'No seleccionado'}<br />
                        <strong>Nro Mesa:</strong> {selectedTable?.numero}<br />
                        <strong>Cantidad de personas:</strong> {selectedTable?.cantidadPersonas}<br />
                        <strong>Monto a Pagar:</strong> $100.00 {/* Puedes ajustar el monto según sea necesario */}
                    </Card.Text>
                    <Button variant="primary" className="me-2" onClick={handlePay}>Pagar</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Pay;