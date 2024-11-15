import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Form, Button, Image } from 'react-bootstrap';
import API_BASE_URL from '../config';

const EditRestaurant = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [telefono, setTelefono] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cuit, setCuit] = useState('');
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Suponiendo que pasas el ID del restaurante en la URL como parámetro

    // Cargar la información del restaurante cuando el componente se monta
    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/restaurants/${id}`);
                const restaurant = response.data;

                setNombre(restaurant.nombre);
                setEmail(restaurant.email);
                setDireccion(restaurant.direccion);
                setContraseña(''); // No mostramos la contraseña existente
                setTelefono(restaurant.telefono);
                setCategoria(restaurant.categoria);
                setCuit(restaurant.cuit);
                setImagen(restaurant.imagen || null); // Ruta de la imagen si existe
            } catch (error) {
                setError("Error al cargar la información del restaurante.");
            }
        };
        fetchRestaurantData();
    }, [id]);

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Actualizar la información del restaurante
            await axios.put(`${API_BASE_URL}/restaurants/${id}`, {
                nombre,
                email,
                direccion,
                contraseña,
                telefono,
                categoria,
                cuit
            });

            // Si hay una nueva imagen, la subimos
            if (imagen) {
                const formData = new FormData();
                formData.append('imagen', imagen);

                await axios.post(`${API_BASE_URL}/restaurants/${id}/upload-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            navigate('/Reserves'); // Redirige a la página de reservas
        } catch (error) {
            setError("Error al actualizar la información del restaurante.");
            console.error("Error al actualizar el restaurante:", error);
        }
    };

    return (
        <Container>
            <h2 className="my-4">Editar Restaurant</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="CUIT" value={cuit} onChange={(e) => setCuit(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Foto del Restaurant</Form.Label>
                    {imagen && typeof imagen === 'string' ? (
                        <Image src={imagen} thumbnail className="mb-2" />
                    ) : (
                        <p>No hay imagen disponible</p>
                    )}
                    <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" className="me-2">Guardar</Button>
                    <Link to='/Reserves'><Button variant="secondary">Cancelar</Button></Link>
                </div>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Container>
    );
}

export default EditRestaurant;