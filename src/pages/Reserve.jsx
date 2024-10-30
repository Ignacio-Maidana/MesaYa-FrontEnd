import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TableLayout from '../components/TableLayout'
import { Link } from 'react-router-dom';

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

    // Maneja la selección de mesa
    const handleTableSelect = (table) => {
        if (!table.occupied) {
        setSelectedTable(table);
        }
    };

    // Cierra el aside
    const closeAside = () => {
        setSelectedTable(null);
    };

    return (
        <>
        <div>
        <h2>Reservar en el Restaurant</h2>

        {/* Selección de fecha */}
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Selecciona la fecha"
            minDate={new Date()}
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
        <Link to='/Carte'><button>Ver Carta</button></Link>
        </div>

        <div>
            {/* Layout de mesas */}
            <h3>Mesas Disponibles</h3>
            <TableLayout numberOfTables={10} onTableSelect={handleTableSelect} />

            {/* Aside con detalles de la mesa */}
            {selectedTable && (
                <aside style={{
                position: 'fixed', right: 0, top: 0, width: '300px', height: '100%', backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '-2px 0 5px rgba(0,0,0,0.1)'
                }}>
                <h3>Detalles de la Mesa {selectedTable.tableNumber}</h3>
                <p><strong>Fecha:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'No seleccionada'}</p>
                <p><strong>Horario:</strong> {selectedTime || 'No seleccionado'}</p>
                <p><strong>Pago:</strong> Pendiente</p>
                <button onClick={closeAside} style={{ marginTop: '20px' }}>Cerrar</button>
                <Link to='/Pay'><button>Confirmar</button></Link>
                </aside>
            )}
        </div>

        </>
    );
};

export default Reserve; 