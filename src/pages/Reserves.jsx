import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Reserves = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);

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
            </div>

            <div className="Buttons">
                <button>Editar Restaurant</button>
                <button>Editar Mesas</button>
                <button>Editar Carta</button>
                <button>Platos</button>
            </div>
        </>
    )
}

export default Reserves