// En src/pages/Reserves.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reserves = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [restaurantId, setRestaurantId] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [showReservations, setShowReservations] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem('restaurantId');
        setRestaurantId(id);

        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${id}/reservas`);
                setReservations(response.data);
            } catch (error) {
                console.error("Error al obtener las reservas:", error);
            }
        };

        if (id) {
            fetchReservations();
        }
    }, []);

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

    // Efecto para filtrar las reservas cuando cambia la fecha o el horario
    useEffect(() => {
        if (selectedDate) {
            const formattedDate = formatSelectedDate(selectedDate);
            
            let filtered = reservations.filter((reservation) => {
                const reservationDate = new Date(reservation.fecha).toISOString().split('T')[0];
                return reservationDate === formattedDate;
            });

            // Si hay un horario seleccionado, filtrar también por horario
            if (selectedTime) {
                filtered = filtered.filter((reservation) => {
                    const reservationTime = reservation.horario.substring(0, 5);
                    return reservationTime === selectedTime;
                });
            }

            setFilteredReservations(filtered);
            setShowReservations(true);
        } else {
            setShowReservations(false);
            setFilteredReservations([]);
        }
    }, [selectedDate, selectedTime, reservations]);

        // Función para cerrar sesión
        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('restaurantId');
            localStorage.removeItem('restaurantData');
            navigate('/');
        };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2>Ver Reservas del Restaurant</h2>
                <Button variant="danger" onClick={handleLogout}>Cerrar Sesión</Button>
            </div>

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
                    <Form.Label>Horario (opcional)</Form.Label>
                    <Form.Select 
                        value={selectedTime} 
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        <option value="">Todos los horarios</option>
                        {availableTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {showReservations && (
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
                        {filteredReservations.length > 0 ? (
                            filteredReservations.map((reservation) => (
                                <tr key={reservation.idReserva}>
                                    <td>{`${reservation.Cliente.nombre} ${reservation.Cliente.apellido}`}</td>
                                    <td>{reservation.Mesa.numero}</td>
                                    <td>{reservation.Mesa.cantidadPersonas}</td>
                                    <td>{new Date(reservation.fecha).toLocaleDateString()}</td>
                                    <td>{reservation.horario}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No hay reservas para {selectedTime ? 'esta fecha y horario' : 'esta fecha'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            <div className="mt-4">
                <Link to={`/EditRestaurant`}><Button variant="primary" className="me-2">Editar Restaurant</Button></Link>
                <Link to="/EditCarte"><Button variant="primary" className="me-2">Editar Carta</Button></Link>
                <Link to="/EditTables"><Button variant="primary" className='me-2'>Editar Mesas</Button></Link>
                <Link to="/Plates"><Button variant="primary" className='me-2'>Platos</Button></Link>
                <Link to="/Drinks"><Button variant="primary" className='me-2'>Bebidas</Button></Link>
            </div>
        </Container>
    );
};

export default Reserves;