import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const Chair = () => (
    <div style={{ width: '20px', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '50%', margin: '5px' }} />
);

const TableWithChairs = ({ table, onClick }) => (
    <button
        onClick={() => onClick(table)}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px',
            cursor: 'pointer',
            backgroundColor: table.occupied ? '#ffcccb' : '#c8e6c9',
            padding: '10px',
            borderRadius: '10%',
            border: 'none',
        }}
    >
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Mesa {table.numero}</div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '120px' }}>
            {Array.from({ length: table.cantidadPersonas }).map((_, index) => (
                <Chair key={index} />
            ))}
        </div>
    </button>
);

const TableLayout = ({ onTableSelect }) => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/mesas`);
                setTables(response.data);
            } catch (error) {
                console.error('Error al obtener las mesas:', error);
            }
        };

        fetchTables();
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {tables.map((table) => (
                <TableWithChairs key={table.idMesa} table={table} onClick={onTableSelect} />
            ))}
        </div>
    );
};

export default TableLayout;