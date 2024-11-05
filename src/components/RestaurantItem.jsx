import React from "react";
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const RestaurantItem = () => {
    return (
        <Card className="mb-3">
            <Card.Img variant="top" src="placeholder-image.jpg" alt="Restaurant" />
            <Card.Body>
                <Card.Title>Restaurante - Nombre</Card.Title>
                <Card.Text>
                    <strong>Dirección</strong><br />
                    <strong>Teléfono</strong>
                </Card.Text>
                <Link to='/Reserve'>
                    <Button variant="primary">Reservar</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default RestaurantItem;