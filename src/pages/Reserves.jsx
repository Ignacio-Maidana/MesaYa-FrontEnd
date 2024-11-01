import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

// Simulación de datos de reservas
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

  // Genera intervalos de media hora desde las 8:00 a.m. hasta las 11:00 p.m.
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

  // Función para formatear la fecha seleccionada al formato 'YYYY-MM-DD'
    const formatSelectedDate = (date) => {
        return date ? date.toISOString().split('T')[0] : '';
    };

    // Filtra reservas por fecha y hora seleccionadas
    useEffect(() => {
        if (selectedDate && selectedTime) {
        const formattedDate = formatSelectedDate(selectedDate); // Formatea la fecha
        const filtered = mockReservations.filter(
            (reservation) => reservation.date === formattedDate && reservation.time === selectedTime
        );

        console.log("selectedDate:", formattedDate);
        console.log("selectedTime:", selectedTime);
        console.log("filteredReservations:", filtered);

        setFilteredReservations(filtered);
        } else {
        setFilteredReservations([]);
        }
    }, [selectedDate, selectedTime]);

    return (
        <>
            <div>
            <h2>Ver Reservas del Restaurant</h2>

            {/* Selección de fecha */}
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="Selecciona la fecha"
            />

            {/* Selección de horario */}
            <FormControl fullWidth style={{ margin: '20px 0' }}>
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

            {/* Tabla de reservas */}
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Nombre del Cliente</TableCell>
                    <TableCell>Número de Mesa</TableCell>
                    <TableCell>Cantidad de Personas</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                        <TableCell>{reservation.name}</TableCell>
                        <TableCell>{reservation.tableNumber}</TableCell>
                        <TableCell>{reservation.people}</TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                        No hay reservas para la fecha y hora seleccionadas.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </TableContainer>
            </div>

            <div className="buttons">
                <Link to="/EditRestaurant"><button>Editar Restaurant</button></Link>
                <Link to="/EditTables"><button>Editar Mesas</button></Link>
                <Link to="/EditCarte"><button>Editar Carta</button></Link>
                <Link to="/Plates"><button>Platos</button></Link>
            </div>
        </>
    );
};

export default Reserves;
