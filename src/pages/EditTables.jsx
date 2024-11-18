import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EditTables = () => {
    const [mesas, setMesas] = useState([]);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [numeroMesa, setNumeroMesa] = useState("");
    const [estadoMesa, setEstadoMesa] = useState("Desocupado"); // Estado por defecto para nueva mesa
    const [cantidadPersonas, setCantidadPersonas] = useState("");
    const [isAddingNew, setIsAddingNew] = useState(true);
    const [error, setError] = useState(null);
    const restaurantId = localStorage.getItem('restaurantId'); // Obtener el ID del restaurante del localStorage

    // Cargar todas las mesas del restaurante desde el backend al cargar el componente
    useEffect(() => {
        const fetchMesas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/mesas`);
                setMesas(response.data);
            } catch (error) {
                console.error("Error al obtener las mesas:", error);
            }
        };
        fetchMesas();
    }, [restaurantId]);

    // Manejar la selección de una mesa en el <select>
    const handleSelectMesa = (e) => {
        const selectedMesaId = e.target.value ? parseInt(e.target.value, 10) : null;

        if (selectedMesaId) {
            const mesa = mesas.find((m) => m.idMesa === selectedMesaId);
            if (mesa) {
                setMesaSeleccionada(mesa);
                setNumeroMesa(mesa.numero);
                setEstadoMesa(mesa.estado);
                setCantidadPersonas(mesa.cantidadPersonas);
                setIsAddingNew(false);
            }
        } else {
            // Si no hay mesa seleccionada, limpiar los campos
            setMesaSeleccionada(null);
            setNumeroMesa("");
            setEstadoMesa("Desocupado"); // Estado por defecto
            setCantidadPersonas("");
            setIsAddingNew(true);
        }
    };

    const handleSaveMesa = async () => {
        // Validar que el número de mesa y la cantidad de personas sean mayores que 0
        if (numeroMesa <= 0 || cantidadPersonas <= 0) {
            setError("El número de mesa y la cantidad de personas deben ser mayores que 0.");
            return;
        }

        try {
            const mesaData = {
                numero: parseInt(numeroMesa, 10),
                estado: estadoMesa,
                cantidadPersonas: parseInt(cantidadPersonas, 10),
                idRestaurant: restaurantId // Vincular la mesa con el restaurante logueado
            };

            if (isAddingNew) {
                await axios.post("http://localhost:8000/api/mesas", mesaData);
            } else if (mesaSeleccionada) {
                await axios.put(`http://localhost:8000/api/mesas/${mesaSeleccionada.idMesa}`, mesaData);
            }

            const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/mesas`);
            setMesas(response.data);
            handleReset();
        } catch (error) {
            console.error("Error al guardar la mesa:", error);
        }
    };

    // Eliminar la mesa seleccionada
    const handleDeleteMesa = async () => {
        try {
            if (mesaSeleccionada) {
                await axios.delete(`http://localhost:8000/api/mesas/${mesaSeleccionada.idMesa}`);
                // Recargar las mesas después de eliminar
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/mesas`);
                setMesas(response.data);
                handleReset();
            }
        } catch (error) {
            console.error("Error al eliminar la mesa:", error);
        }
    };

    // Limpiar el formulario y volver al modo de agregar nueva mesa
    const handleReset = () => {
        setMesaSeleccionada(null);
        setNumeroMesa("");
        setEstadoMesa("Desocupado"); // Estado por defecto
        setCantidadPersonas("");
        setIsAddingNew(true);
        setError(null);
    };

    return (
        <Container className="mt-5">
            <Form className="my-4">
                <Form.Group className="mb-3">
                    <Form.Label>Selecciona una mesa:</Form.Label>
                    <Form.Select onChange={handleSelectMesa} value={mesaSeleccionada ? mesaSeleccionada.idMesa : ""}>
                        <option value="">Nueva Mesa</option>
                        {mesas.map((mesa) => (
                            <option key={mesa.idMesa} value={mesa.idMesa}>
                                Mesa {mesa.numero}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Número de Mesa:</Form.Label>
                    <Form.Control
                        type="number"
                        value={numeroMesa}
                        onChange={(e) => setNumeroMesa(e.target.value)}
                        min="1" // Asegura que el valor mínimo sea 1
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Estado:</Form.Label>
                    <Form.Control
                        type="text"
                        value={estadoMesa}
                        onChange={(e) => setEstadoMesa(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cantidad de Personas:</Form.Label>
                    <Form.Control
                        type="number"
                        value={cantidadPersonas}
                        onChange={(e) => setCantidadPersonas(e.target.value)}
                        min="1" // Asegura que el valor mínimo sea 1
                    />
                </Form.Group>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button variant="primary" className="me-2" onClick={handleSaveMesa}>
                    {isAddingNew ? "Agregar Nueva Mesa" : "Guardar Cambios"}
                </Button>
                {!isAddingNew && (
                    <Button variant="danger" className="me-2" onClick={handleDeleteMesa}>
                        Eliminar Mesa
                    </Button>
                )}
                <Link to="/Reserves">
                    <Button variant="secondary">Volver</Button>
                </Link>
            </Form>
        </Container>
    );
};

export default EditTables;