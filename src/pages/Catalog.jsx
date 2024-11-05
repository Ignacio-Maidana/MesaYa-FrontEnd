import React from "react";
import RestaurantItem from "../components/RestaurantItem";
import { Container, Row, Col } from 'react-bootstrap';

const Catalog = () => {
    return (
        <Container>
            <h2 className="my-4">Restaurantes disponibles!</h2>
            <Row>
                <Col md={4}>
                    <RestaurantItem />
                </Col>
                <Col md={4}>
                    <RestaurantItem />
                </Col>
                <Col md={4}>
                    <RestaurantItem />
                </Col>
                <Col md={4}>
                    <RestaurantItem />
                </Col>
                <Col md={4}>
                    <RestaurantItem />
                </Col>
                <Col md={4}>
                    <RestaurantItem />
                </Col>
            </Row>
        </Container>
    )
}

export default Catalog;