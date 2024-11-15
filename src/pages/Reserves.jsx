import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

const Reserves = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [restaurantId, setRestaurantId] = useState(null); // Asegúrate de tener el ID del restaurante

    const generateTimeSlots = () => {
        const times = [];
        let currentTime = new Date();
        currentTime.setHours(8, 0, 0, 0);
        const endTime = new Date();
        endTime.setHours(23, 0, 0, 0);

        while (currentTime <= endTime) {
            times.push(
                currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
            );
            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }
        return times;
    };

    useEffect(() => {
        setAvailableTimes(generateTimeSlots());
    }, []);

    const formatSelectedDate = (date) => {
        return date ? date.toISOString().split('T')[0] : '';
    };

    useEffect(() => {
        if (selectedDate && selectedTime) {
            const fetchReservations = async () => {
                try {
                    const formattedDate = formatSelectedDate(selectedDate);
                    const response = await axios.get(`${API_BASE_URL}/reservas`, {
                        params: {
                            fecha: formattedDate,
                            hora: selectedTime,
                        },
                    });
                    setFilteredReservations(response.data);
                } catch (error) {
                    console.error('Error al obtener las reservas:', error);
                }
            };

            fetchReservations();
        } else {
            setFilteredReservations([]);
        }
    }, [selectedDate, selectedTime]);

    return (
        <Container>
            <h2 className="my-4">Ver Reservas del Restaurant</h2>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Label>Selecciona la fecha</Form.Label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        placeholderText="Selecciona la fecha"
                    />
                </Col>

                <Col md={6}>
                    <Form.Label>Horario</Form.Label>
                    <Form.Select 
                        value={selectedTime} 
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        <option value="">Selecciona un horario</option>
                        {availableTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Nombre del Cliente</th>
                        <th>Número de Mesa</th>
                        <th>Cantidad de Personas</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.nombreCliente}</td>
                            <td>{reservation.numeroMesa}</td>
                            <td>{reservation.cantidadPersonas}</td>
                            <td>{reservation.fecha}</td>
                            <td>{reservation.hora}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="mt-4">
                <Link to={`/EditRestaurant/${restaurantId}`}><Button variant="primary" className="me-2">Editar Restaurant</Button></Link>
                <Link to="/EditCarte"><Button variant="primary" className="me-2">Editar Carta</Button></Link>
                <Link to="/EditTables"><Button variant="primary" className='me-2'>Editar Mesas</Button></Link>
                <Link to="/Plates"><Button variant="primary" className='me-2'>Platos</Button></Link>
            </div>
        </Container>
    );
};

export default Reserves;