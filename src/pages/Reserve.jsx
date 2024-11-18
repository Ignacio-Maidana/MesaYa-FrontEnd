import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TableLayout from '../components/TableLayout'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const Reserve = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [mesas, setMesas] = useState([]);
    const { id } = useParams(); // Obtener el ID del restaurante de la URL
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la información del restaurante
        const fetchRestaurantData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error("Error al obtener la información del restaurante:", error);
            }
        };

        // Obtener las mesas del restaurante
        const fetchMesas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${id}/mesas`);
                setMesas(response.data);
            } catch (error) {
                console.error("Error al obtener las mesas:", error);
            }
        };

        fetchRestaurantData();
        fetchMesas();
    }, [id]);

    const getNextClosestTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + (30 - (now.getMinutes() % 30)), 0, 0);
        if (now.getHours() < 8) {
            now.setHours(8, 0, 0, 0);
        }
        return now;
    };

    const generateTimeSlots = (date) => {
        const times = [];
        let currentTime = new Date(date);
        currentTime.setHours(8, 0, 0, 0);
        const endTime = new Date(date);
        endTime.setHours(23, 0, 0, 0);

        const now = new Date();
        while (currentTime <= endTime) {
            if (date.toDateString() === now.toDateString() && currentTime < now) {
                currentTime.setMinutes(currentTime.getMinutes() + 30);
                continue;
            }
            times.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }
        return times;
    };

    useEffect(() => {
        if (selectedDate) {
            setAvailableTimes(generateTimeSlots(selectedDate));
        }
    }, [selectedDate]);

    const handleTableSelect = (table) => {
        if (!table.occupied) {
            setSelectedTable(table);
        }
    };

    const closeAside = () => {
        setSelectedTable(null);
    };

    const handleViewCarte = () => {
        navigate(`/Carte/${id}`, { state: { restaurant } });
    };

    const handleConfirm = () => {
        const reservationData = {
            restaurant,
            selectedDate,
            selectedTime,
            selectedTable
        };
        navigate('/Pay', { state: { reservationData } });
    };

    return (
        <Container>
        <Row className="mt-5">
            <Col md={6}>
                <h2>Reservar en {restaurant?.nombre}</h2>
                <p><strong>Dirección:</strong> {restaurant?.direccion}</p>
                <p><strong>Teléfono:</strong> {restaurant?.telefono}</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Selecciona la fecha"
                    minDate={new Date()}
                    className="form-control mb-3"
                />
                <FormControl fullWidth className="mb-3">
                    <InputLabel>Horario</InputLabel>
                    <Select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        label="Horario"
                    >
                        {availableTimes.map((time, index) => (
                            <MenuItem key={index} value={time}>
                                {time}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="secondary" onClick={handleViewCarte}>Ver Carta</Button>
            </Col>
            <Col md={6}>
                <h3>Mesas Disponibles</h3>
                <TableLayout 
                    mesas={mesas} 
                    onTableSelect={handleTableSelect} 
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                />
            </Col>
        </Row>

            {selectedTable && (
                <div className="position-fixed top-0 end-0 p-4 bg-light" style={{width: '300px', height: '100%', boxShadow: '-2px 0 5px rgba(0,0,0,0.1)'}}>
                    <h3>Detalles de la Mesa {selectedTable.numero}</h3>
                    <p><strong>Fecha:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'No seleccionada'}</p>
                    <p><strong>Horario:</strong> {selectedTime || 'No seleccionado'}</p>
                    <p><strong>Pago:</strong> Pendiente</p>
                    <Button variant="secondary" onClick={closeAside} className="me-2">Cerrar</Button>
                    <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
                </div>
            )}
        </Container>
    );
};

export default Reserve;