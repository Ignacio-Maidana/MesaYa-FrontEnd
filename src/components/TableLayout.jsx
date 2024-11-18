import React, {useState, useEffect} from 'react';
import axios from 'axios';

const TableWithChairs = ({ table, onClick, isOccupied }) => (
    <button
        onClick={() => !isOccupied && onClick(table)}
        style={{
            width: '100px',
            height: '100px',
            margin: '10px',
            backgroundColor: isOccupied ? '#FF6464' : '#91C483',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isOccupied ? 'not-allowed' : 'pointer'
        }}
    >
        <div>Mesa {table.numero}</div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '120px' }}>
            {Array.from({ length: table.cantidadPersonas }).map((_, index) => (
                <div key={index} style={{ width: '10px', height: '10px', backgroundColor: 'white', margin: '2px' }} />
            ))}
        </div>
    </button>
);

const TableLayout = ({ mesas, onTableSelect, selectedDate, selectedTime }) => {
    const [reservations, setReservations] = useState([]);
    const restaurantId = localStorage.getItem('restaurantId');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/reservas`);
                setReservations(response.data);
            } catch (error) {
                console.error("Error al obtener las reservas:", error);
            }
        };
        fetchReservations();
    }, [restaurantId]);

    const isTableOccupied = (mesa) => {
        if (!selectedDate || !selectedTime) return false;

        return reservations.some(reservation => 
            reservation.idMesa === mesa.idMesa &&
            new Date(reservation.fecha).toLocaleDateString() === selectedDate.toLocaleDateString() &&
            reservation.horario === selectedTime
        );
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {mesas.map((table) => (
                <TableWithChairs 
                    key={table.idMesa} 
                    table={table} 
                    onClick={onTableSelect} 
                    isOccupied={isTableOccupied(table)}
                />
            ))}
        </div>
    );
};

export default TableLayout;