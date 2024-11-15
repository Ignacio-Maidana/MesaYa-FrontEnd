import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import API_BASE_URL from "../config";

const RestaurantItem = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/restaurants`);
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error al obtener los restaurantes:", error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div>
            {restaurants.map((restaurant) => (
                <Card className="mb-3" key={restaurant.id}>
                    <Card.Img variant="top" src={restaurant.imagen || "placeholder-image.jpg"} alt="Restaurant" />
                    <Card.Body>
                        <Card.Title>{restaurant.nombre}</Card.Title>
                        <Card.Text>
                            <strong>Dirección:</strong> {restaurant.direccion}<br />
                            <strong>Teléfono:</strong> {restaurant.telefono}
                        </Card.Text>
                        <Link to={`/Reserve/${restaurant.id}`}>
                            <Button variant="primary">Reservar</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default RestaurantItem;