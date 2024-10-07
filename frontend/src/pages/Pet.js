import React, { useEffect, useState } from 'react';
import { getPetState, feedPet, sleepPet, healPet, revivePet } from '../services/api';
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Pet = () => {
    const [petState, setPetState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await getPetState();
                console.log("Respuesta del estado de la mascota:", response.data);
                setPetState(response.data); // Esto debería contener el estado de la mascota
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Sesión expirada, por favor inicia sesión de nuevo.');
                    navigate('/login');
                } else {
                    console.error("Error fetching pet state:", error);
                    setError('Error al cargar el estado de la mascota.');
                }
            } finally {
                setLoading(false); // Siempre establece loading a false, ya sea en éxito o error
            }
        };

        fetchPetData();
    }, [navigate]);

    const handleFeed = async () => {
        await feedPet();
        await refreshPetState();
    };

    const handleSleep = async () => {
        await sleepPet();
        await refreshPetState();
    };

    const handleHeal = async () => {
        await healPet();
        await refreshPetState();
    };

    const handleRevive = async () => {
        await revivePet();
        await refreshPetState();
    };

    const refreshPetState = async () => {
        try {
            const response = await getPetState();
            setPetState(response.data);
        } catch (error) {
            console.error("Error fetching pet state after action:", error);
            setError('Error al actualizar el estado de la mascota.');
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    if (!petState) {
        return <div>No se encontró información de la mascota.</div>; // Mensaje en caso de que petState no esté definido
    }

    return (
        <div>
            <Navbar bg='light' expand='lg'>
                <Container>
                    <Navbar.Brand>Virtual Sensory</Navbar.Brand>
                    <Nav className='me-auto'>
                        <Nav.Link href='/pet'>Sensory</Nav.Link>
                        <Nav.Link href='/stats'>Estadísticas</Nav.Link>
                    </Nav>

                    <Nav className='ml-auto'>
                        <Navbar.Text>
                            {/* Username */}
                        </Navbar.Text>
                        <Button variant='outline-danger' className='ms-2'>
                            Cerrar Sesión
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className='text-center mt-4'>
                <h1>Estado de Sensory</h1>
                <p>Hambre: {petState.hambre}</p>
                <p>Sueño: {petState.sueño}</p>
                <p>Salud: {petState.salud}</p>
                <p>Está vivo?: {petState.vivo ? "Sí" : "No"}</p>

                <Row className='mt-4'>
                    <Col>
                        <Button onClick={handleFeed} variant="success" className="w-100">Alimentar</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleSleep} variant="secondary" className="w-100">Dormir</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleHeal} variant="info" className="w-100">Curar</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleRevive} variant="warning" className="w-100">Revivir</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Pet;
