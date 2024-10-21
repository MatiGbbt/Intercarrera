import React, { useEffect, useState } from 'react';
import { getPetState, feedPet, sleepPet, healPet, revivePet, getProfile, logout } from '../services/api';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import logo from '../assets/casual-movimiento.gif';
import myGif from '../assets/fondoAnimado.gif';
import petGif from '../assets/casual-movimiento.gif';
import '../style/petEstilo.css';

const Pet = () => {
    const [petState, setPetState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await getPetState();
                //console.log("Respuesta del estado de la mascota:", response);
                setPetState(response); // Esto debería contener el estado de la mascota
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

        const fetchUserProfile = async () => {
            try {
                const profileResponse = await getProfile();
                console.log("Respuesta del perfil:", profileResponse);
                setUsername(profileResponse.data.username);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Sesión expirada, por favor inicia sesión de nuevo.');
                    navigate('/login');
                } else {
                    console.error("Error fetching user profile:", error);
                    setError('Error al obtener el usuario.');
                }
            }
        };

        fetchPetData();
        fetchUserProfile();
    }, [navigate]);

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        try {
            await logout(); // Llama al servicio logout
            toast.success('Sesión cerrada correctamente', {autoClose: 2000});
            setTimeout(() => {
                navigate('/login'); // Redirige después de 2 segundos
            }, 2700);
        } catch (error) {
            toast.error('Hubo un error al cerrar la sesión');
            console.error("Error during logout:", error);
        }
    };

    const convertToPercentage = (value) => {
        switch (value) {
            case 'alto':
                return 100;
            case 'medio':
                return 66;
            case 'bajo':
                return 33;
            default:
                return 0;
        }
    };

    const hambrePercentage = convertToPercentage(petState.state.hambre);
    const saludPercentage = convertToPercentage(petState.state.salud);
    const sueñoPercentage = convertToPercentage(petState.state.sueño);

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
            setPetState(response);
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
            <Navbar expand='xl' className='navbar-custom'>
                <img className='icon-nav' src={logo} alt='Imagen del Logo'/>
                <Navbar.Brand>
                    Virtual Sensory
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className='me-auto my-2 my-lg-0' navbarScroll>
                        <Nav.Link className='btn-nav' href='/pet'>Sensory</Nav.Link>
                        <Nav.Link className='btn-nav' href='/stats'>Estadísticas</Nav.Link>
                    </Nav>

                    <Nav className='d-flex'>
                        <label className='me-2'>{username && `Bienvenido, ${username}`}</label>
                        <button onClick={handleLogout} className='btn-custom'>
                            Cerrar Sesión
                        </button>
                    </Nav>
                </Navbar.Collapse>    
            </Navbar>

            <div className='loginPage flex'>
                <div className='container flex'>
                    <div className='videoDiv'>
                        <img className='background-gif' src={myGif} alt='fondoAnimado'></img>

                        <div className="pet-container">
                            <img className="pet-gif" src={petGif} alt="Pet GIF" />
                        </div>

                        <div className='footerDiv flex'>
                            <button className='btn' onClick={handleFeed}>Alimentar</button>
                            <button className='btn' onClick={handleSleep}>Dormir</button>
                            <button className='btn' onClick={handleHeal}>Curar</button>
                            <button className='btn' onClick={handleRevive}>Revivir</button>
                        </div>
                    </div>

                    <div className='formDiv flex'>
                        <h1>Estado de Sensory</h1>
                        <div className="progress" role="progressbar" aria-label="Hambre" aria-valuenow={hambrePercentage} aria-valuemin="0" aria-valuemax="100" style={{ height: `30px`, width: `350px` }}>
                            <div className="progress-bar bg-warning text-dark" style={{ width: `${hambrePercentage}%` }}>
                                {hambrePercentage}%
                            </div>
                        </div>
                        <p>Hambre: {petState.state.hambre}</p>

                        <div className="progress" role="progressbar" aria-label="Salud" aria-valuenow={saludPercentage} aria-valuemin="0" aria-valuemax="100" style={{ height: `30px`, width: `350px` }}>
                            <div className="progress-bar bg-success text-dark" style={{ width: `${saludPercentage}%` }}>
                                {saludPercentage}%
                            </div>
                        </div>
                        <p>Salud: {petState.state.salud}</p>

                        <div className="progress" role="progressbar" aria-label="Sueño" aria-valuenow={sueñoPercentage} aria-valuemin="0" aria-valuemax="100" style={{ height: `30px`, width: `350px` }}>
                            <div className="progress-bar bg-primary text-dark" style={{ width: `${sueñoPercentage}%` }}>
                                {sueñoPercentage}%
                            </div>
                        </div>
                        <p>Sueño: {petState.state.sueño}</p>


                        <p>Está vivo?: {petState.state.vivo ? "Sí" : "No"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pet;
