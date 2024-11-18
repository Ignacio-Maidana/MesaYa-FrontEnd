import React from "react";
import RestaurantItem from "../components/RestaurantItem";
import { Container} from 'react-bootstrap';

const Catalog = () => {
    return (
        <Container>
            <h2 className="my-4">Restaurantes disponibles!</h2>
            <RestaurantItem />
        </Container>
    )
}

export default Catalog;