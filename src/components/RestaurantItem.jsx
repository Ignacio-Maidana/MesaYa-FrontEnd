import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import '../index.css';

const RestaurantItem = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Llama al backend para obtener todos los restaurantes
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/restaurants");
                setRestaurants(response.data); // Actualiza el estado con los datos de los restaurantes
            } catch (error) {
                console.error("Error al obtener los restaurantes:", error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleReserve = (restaurant) => {
        navigate(`/Reserve/${restaurant.idRestaurant}`, { state: { restaurant } });
    };
    
    return (
        <div>
            {restaurants.map((restaurant) => (
                <Card className="mb-3 restaurant-card" key={restaurant.idRestaurant}>
                    <Card.Img 
                        variant="top" 
                        src={restaurant.imagen || "placeholder-image.jpg"} 
                        alt={restaurant.nombre}
                        className="card-img-top"
                    />
                    <Card.Body>
                        <Card.Title>{restaurant.nombre}</Card.Title>
                        <Card.Text>
                            <strong>Dirección:</strong> {restaurant.direccion}<br />
                            <strong>Teléfono:</strong> {restaurant.telefono}
                        </Card.Text>
                        <Button variant="primary" onClick={() => handleReserve(restaurant)}>Reservar</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default RestaurantItem;