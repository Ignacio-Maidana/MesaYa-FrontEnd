import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import axios from "axios";

const Drinks = () => {
    const [bebidas, setBebidas] = useState([]);
    const [bebidaSeleccionada, setBebidaSeleccionada] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = useState(false); // Nuevo estado para manejar el campo de búsqueda
    const restaurantId = localStorage.getItem('restaurantId'); // Obtener el ID del restaurante del localStorage

    // Obtener todas las bebidas del restaurante al montar el componente
    useEffect(() => {
        const fetchBebidas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/bebidas`);
                setBebidas(response.data);
            } catch (error) {
                console.error('Error al obtener las bebidas:', error);
            }
        };
        fetchBebidas();
    }, [restaurantId]);

    // Manejar la búsqueda en tiempo real
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
        setIsAddingNew(false); // Resetea el modo de "agregar nuevo" cuando se busca
    };

    // Filtrar bebidas según la búsqueda
    const bebidasFiltradas = bebidas.filter((bebida) =>
        bebida.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Manejar la selección de una bebida
    const handleSelectBebida = (bebida) => {
        setBebidaSeleccionada(bebida);
        setNombre(bebida.nombre);
        setPrecio(bebida.precio);
        setDescripcion(bebida.descripcion);
        setIsAddingNew(false);
    };

    // Preparar el formulario para agregar una nueva bebida
    const handleAgregarNuevo = () => {
        setBebidaSeleccionada(null);
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setIsAddingNew(true);
        setIsSearchDisabled(true); // Deshabilitar el campo de búsqueda
    };

    // Cancelar la acción de agregar nueva bebida
    const handleCancelar = () => {
        setIsAddingNew(false);
        setIsSearchDisabled(false); // Habilitar el campo de búsqueda
        setBusqueda(''); // Limpiar el campo de búsqueda
    };

    // Guardar o actualizar bebida
    const handleGuardar = async () => {
        try {
            const bebidaData = {
                nombre,
                precio,
                descripcion,
                idRestaurant: restaurantId // Vincular la bebida con el restaurante logueado
            };

            if (isAddingNew) {
                // Agregar nueva bebida
                await axios.post('http://localhost:8000/api/bebidas', bebidaData);
            } else if (bebidaSeleccionada) {
                // Actualizar bebida existente
                await axios.put(`http://localhost:8000/api/bebidas/${bebidaSeleccionada.idBebida}`, bebidaData);
            }

            // Recargar la lista de bebidas después de guardar
            const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/bebidas`);
            setBebidas(response.data);
            // Resetear el formulario después de guardar
            handleAgregarNuevo();
        } catch (error) {
            console.error('Error al guardar la bebida:', error);
        }
    };

    // Eliminar la bebida seleccionada
    const handleDeleteBebida = async () => {
        try {
            if (bebidaSeleccionada) {
                await axios.delete(`http://localhost:8000/api/bebidas/${bebidaSeleccionada.idBebida}`);
                // Recargar las bebidas después de eliminar
                const response = await axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/bebidas`);
                setBebidas(response.data);
                handleAgregarNuevo();
            }
        } catch (error) {
            console.error("Error al eliminar la bebida:", error);
        }
    };

    return (
        <Container className="mt-5">
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Bebida"
                    value={busqueda}
                    onChange={handleBusquedaChange}
                    disabled={isSearchDisabled} // Deshabilitar el campo de búsqueda si se está agregando una nueva bebida
                />
                <Button variant="outline-secondary" onClick={isAddingNew ? handleCancelar : handleAgregarNuevo}>
                    {isAddingNew ? 'Cancelar' : 'Agregar'}
                </Button>
            </InputGroup>
            {busqueda && (
                <ul>
                    {bebidasFiltradas.map((bebida) => (
                        <li
                            key={bebida.idBebida}
                            onClick={() => handleSelectBebida(bebida)}
                            style={{ cursor: 'pointer' }}
                        >
                            {bebida.nombre}
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
                <Button variant="primary" className="me-2" onClick={handleGuardar}>
                    {isAddingNew ? 'Agregar Nuevo' : 'Guardar'}
                </Button>
                {!isAddingNew && (
                    <Button variant="danger" className="me-2" onClick={handleDeleteBebida}>
                        Eliminar Bebida
                    </Button>
                )}
                <Link to="/Reserves">
                    <Button variant="secondary">Volver</Button>
                </Link>
            </Form>
        </Container>
    );
}

export default Drinks;