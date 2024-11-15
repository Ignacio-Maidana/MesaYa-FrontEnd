import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';
import API_BASE_URL from '../config';

const RegisterRestaurant = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [telefono, setTelefono] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cuit, setCuit] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [imagen, setImagen] = useState(null); // Para manejar la imagen
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]); // Guarda el archivo de imagen seleccionado
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
            // Crear el restaurante y obtener el ID de la respuesta
            const restaurantResponse = await axios.post(`${API_BASE_URL}/restaurants`, {
                nombre,
                email,
                direccion,
                contraseña,
                telefono,
                categoria,
                cuit,
                provincia,
                localidad
            });

            const restaurantId = restaurantResponse.data.id; // Obtener el ID del restaurante creado
    
            if (!restaurantId) {
                throw new Error("Error: No se ha recibido el ID del restaurante creado.");
            }
            
            // Verifica si el restaurante fue creado y si la imagen existe
            if (restaurantId && imagen) {
                const formData = new FormData();
                formData.append('imagen', imagen);
    
                // Subir la imagen usando el ID del restaurante
                await axios.post(`${API_BASE_URL}/restaurants/${restaurantId}/upload-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
    
            navigate('/LogInRestaurant'); // Redirige a la página de inicio de sesión
        } catch (error) {
            setError(error.response ? error.response.data : 'Error al registrarse');
            console.error("Error al registrar el restaurant:", error);
        }
    };
    

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Registro de Restaurante</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Nombre del Restaurante" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control     type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Categoría (Ej: Italiana, Japonesa)" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="CUIT" value={cuit} onChange={(e) => setCuit(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Sube una imagen de tu restaurante</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} name="imagen"/>
                </Form.Group>
                <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit">Registrarme</Button>
                </div>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Container>
    );
};

export default RegisterRestaurant;
