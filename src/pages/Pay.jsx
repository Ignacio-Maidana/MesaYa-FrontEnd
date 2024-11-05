import React from "react";
import { Container, Card, Button } from 'react-bootstrap';

const Pay = () => {
    return (
        <Container className="mt-5">
            <Card>
                <Card.Header as="h2">Tu Reserva</Card.Header>
                <Card.Body>
                    <Card.Title>Restaurant - Nombre del Restaurante</Card.Title>
                    <Card.Text>
                        <strong>Fecha:</strong> 01/01/2024<br />
                        <strong>Hora:</strong> 20:00<br />
                        <strong>Nro Mesa:</strong> 5<br />
                        <strong>Cantidad de personas:</strong> 4<br />
                        <strong>Monto a Pagar:</strong> $100.00
                    </Card.Text>
                    <Button variant="primary" className="me-2">Pagar</Button>
                    <Button variant="secondary">Cancelar</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Pay;