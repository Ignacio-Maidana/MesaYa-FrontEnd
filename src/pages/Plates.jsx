import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import axios from "axios";

const Plates = () => {
    const [platos, setPlatos] = useState([]);
    const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = useState(false); // Nuevo estado para manejar el campo de búsqueda
    const restaurantId = localStorage.getItem('restaurantId'); // Obtener el ID del restaurante del localStorage

    // Obtener todos los platos del restaurante al montar el componente
    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/platos`);
                setPlatos(response.data);
            } catch (error) {
                console.error('Error al obtener los platos:', error);
            }
        };
        fetchPlatos();
    }, [restaurantId]);

    // Manejar la búsqueda en tiempo real
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
        setIsAddingNew(false); // Resetea el modo de "agregar nuevo" cuando se busca
    };

    // Filtrar platos según la búsqueda
    const platosFiltrados = platos.filter((plato) =>
        plato.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Manejar la selección de un plato
    const handleSelectPlato = (plato) => {
        setPlatoSeleccionado(plato);
        setNombre(plato.nombre);
        setPrecio(plato.precio);
        setDescripcion(plato.descripcion);
        setCategoria(plato.categoria);
        setIsAddingNew(false);
    };

    // Preparar el formulario para agregar un nuevo plato
    const handleAgregarNuevo = () => {
        setPlatoSeleccionado(null);
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setCategoria('');
        setIsAddingNew(true);
        setIsSearchDisabled(true); // Deshabilitar el campo de búsqueda
    };

    // Cancelar la acción de agregar nuevo plato
    const handleCancelar = () => {
        setIsAddingNew(false);
        setIsSearchDisabled(false); // Habilitar el campo de búsqueda
        setBusqueda(''); // Limpiar el campo de búsqueda
    };

    // Guardar o actualizar plato
    const handleGuardar = async () => {
        try {
            const platoData = {
                nombre,
                precio,
                descripcion,
                categoria,
                idRestaurant: restaurantId // Vincular el plato con el restaurante logueado
            };

            if (isAddingNew) {
                // Agregar nuevo plato
                await axios.post('http://localhost:8000/api/platos', platoData);
            } else if (platoSeleccionado) {
                // Actualizar plato existente
                await axios.put(`http://localhost:8000/api/platos/${platoSeleccionado.idPlato}`, platoData);
            }

            // Recargar la lista de platos después de guardar
            const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/platos`);
            setPlatos(response.data);
            // Resetear el formulario después de guardar
            handleAgregarNuevo();
        } catch (error) {
            console.error('Error al guardar el plato:', error);
        }
    };

    // Eliminar el plato seleccionado
    const handleDeletePlato = async () => {
        try {
            if (platoSeleccionado) {
                await axios.delete(`http://localhost:8000/api/platos/${platoSeleccionado.idPlato}`);
                // Recargar los platos después de eliminar
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/platos`);
                setPlatos(response.data);
                handleAgregarNuevo();
            }
        } catch (error) {
            console.error("Error al eliminar el plato:", error);
        }
    };

    return (
        <Container className="mt-5">
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Plato"
                    value={busqueda}
                    onChange={handleBusquedaChange}
                    disabled={isSearchDisabled} // Deshabilitar el campo de búsqueda si se está agregando un nuevo plato
                />
                <Button variant="outline-secondary" onClick={isAddingNew ? handleCancelar : handleAgregarNuevo}>
                    {isAddingNew ? 'Cancelar' : 'Agregar'}
                </Button>
            </InputGroup>
            {busqueda && (
                <ul>
                    {platosFiltrados.map((plato) => (
                        <li
                            key={plato.idPlato}
                            onClick={() => handleSelectPlato(plato)}
                            style={{ cursor: 'pointer' }}
                        >
                            {plato.nombre}
                        </li>
                    ))}
                </ul>
            )}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Categoría"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" className="me-2" onClick={handleGuardar}>
                    {isAddingNew ? 'Agregar Nuevo' : 'Guardar'}
                </Button>
                {!isAddingNew && (
                    <Button variant="danger" className="me-2" onClick={handleDeletePlato}>
                        Eliminar Plato
                    </Button>
                )}
                <Link to="/Reserves">
                    <Button variant="secondary">Volver</Button>
                </Link>
            </Form>
        </Container>
    );
}

export default Plates;