import React, { useState } from 'react';

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
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Mesa {table.tableNumber}</div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '120px' }}>
            {Array.from({ length: table.chairs }).map((_, index) => (
                <Chair key={index} />
            ))}
        </div>
    </button>
);

const TableLayout = ({ numberOfTables, onTableSelect }) => {
    const [tables, setTables] = useState(
        Array.from({ length: numberOfTables }).map((_, index) => ({
            tableNumber: index + 1,
            chairs: Math.floor(Math.random() * 5) + 2,
            occupied: Math.random() < 0.5,
        }))
    );

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {tables.map((table) => (
                <TableWithChairs key={table.tableNumber} table={table} onClick={onTableSelect} />
            ))}
        </div>
    );
};

export default TableLayout;