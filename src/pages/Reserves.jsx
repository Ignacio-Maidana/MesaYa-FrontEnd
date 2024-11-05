import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const mockReservations = [
    { id: 1, name: 'Juan Perez', tableNumber: 5, people: 4, date: '2024-10-30', time: '12:00' },
    { id: 2, name: 'Ana Gomez', tableNumber: 3, people: 2, date: '2024-10-30', time: '14:00' },
    { id: 3, name: 'Carlos Lopez', tableNumber: 7, people: 6, date: '2024-10-30', time: '18:30' },
];

const Reserves = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);

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
            const formattedDate = formatSelectedDate(selectedDate);
            const filtered = mockReservations.filter(
                (reservation) => reservation.date === formattedDate && reservation.time === selectedTime
            );

            setFilteredReservations(filtered);
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
                            <td>{reservation.name}</td>
                            <td>{reservation.tableNumber}</td>
                            <td>{reservation.people}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.time}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="mt-4">
                <Link to="/EditRestaurant"><Button variant="primary" className="me-2">Editar Restaurant</Button></Link>
                <Link to="/EditCarte"><Button variant="primary" className="me-2">Editar Carta</Button></Link>
                <Link to="/EditTables"><Button variant="primary">Editar Mesas</Button></Link>
            </div>
        </Container>
    );
};

export default Reserves;