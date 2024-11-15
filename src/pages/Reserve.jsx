import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TableLayout from '../components/TableLayout';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import API_BASE_URL from '../config';

const Reserve = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    const getNextClosestTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + (30 - (now.getMinutes() % 30)), 0, 0);
        if (now.getHours() < 8) {
            now.setHours(8, 0, 0, 0);
        } else if (now.getHours() >= 23 && now.getMinutes() > 0) {
            return null;
        }
        return now;
    };

    const generateTimeSlots = useCallback(() => {
        const times = [];
        let startTime = getNextClosestTime();
        if (!startTime) return times;

        const endTime = new Date();
        endTime.setHours(23, 0, 0, 0);

        while (startTime <= endTime) {
            times.push(
                new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
            startTime.setMinutes(startTime.getMinutes() + 30);
        }
        return times;
    }, []);

    useEffect(() => {
        setAvailableTimes(generateTimeSlots());
    }, [generateTimeSlots, selectedDate]);

    const handleTableSelect = (table) => {
        if (!table.occupied) {
            setSelectedTable(table);
        }
    };

    const closeAside = () => {
        setSelectedTable(null);
    };

    const handleConfirmReservation = async () => {
        try {
            await axios.post(`${API_BASE_URL}/reservas`, {
                fecha: selectedDate,
                hora: selectedTime,
                idMesa: selectedTable.idMesa,
                // Agrega otros datos necesarios para la reserva
            });
            // Maneja la confirmación de la reserva (e.g., redirigir a otra página)
        } catch (error) {
            console.error('Error al confirmar la reserva:', error);
        }
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col md={6}>
                    <h2>Reservar en el Restaurant</h2>
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
                    <Link to='/Carte'>
                        <Button variant="secondary">Ver Carta</Button>
                    </Link>
                </Col>
                <Col md={6}>
                    <h3>Mesas Disponibles</h3>
                    <TableLayout numberOfTables={10} onTableSelect={handleTableSelect} />
                </Col>
            </Row>

            {selectedTable && (
                <div className="position-fixed top-0 end-0 p-4 bg-light" style={{width: '300px', height: '100%', boxShadow: '-2px 0 5px rgba(0,0,0,0.1)'}}>
                    <h3>Detalles de la Mesa {selectedTable.numero}</h3>
                    <p><strong>Fecha:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'No seleccionada'}</p>
                    <p><strong>Horario:</strong> {selectedTime || 'No seleccionado'}</p>
                    <p><strong>Pago:</strong> Pendiente</p>
                    <Button variant="secondary" onClick={closeAside} className="me-2">Cerrar</Button>
                    <Button variant="primary" onClick={handleConfirmReservation}>Confirmar</Button>
                </div>
            )}
        </Container>
    );
};

export default Reserve;