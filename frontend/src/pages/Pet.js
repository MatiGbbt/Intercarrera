import React, { useEffect, useState } from 'react';
import { getPetState, feedPet, sleepPet, healPet, revivePet, getPetData } from '../services/api';

const Pet = () => {
    const [petState, setPetState] = useState(null);
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchPetState = async () => {
            try {
                const response = await getPetState();
                setPetState(response.data);
            } catch (error) {
                console.error("Error fetching pet state:", error);
            }
        };

        const fetchPetData = async () => {
            try {
                const data = await getPetData();
                setPet(data);
            } catch (err) {
                setError('Error al cargar los datos de la mascota');
            } finally {
                setLoading(false);
            }
        };

        fetchPetState();
        fetchPetData();
    }, []);

    const handleFeed = async () => {
        await feedPet();
        // Actualizar el estado después de alimentar
        const response = await getPetState();
        setPetState(response.data);
    };

    const handleSleep = async () => {
        await sleepPet();
        const response = await getPetState();
        setPetState(response.data);
    };

    const handleHeal = async () => {
        await healPet();
        const response = await getPetState();
        setPetState(response.data);
    };

    const handleRevive = async () => {
        await revivePet();
        const response = await getPetState();
        setPetState(response.data);
    };

    if (!petState) return <div>Cargando...</div>;
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Información de la Mascota</h1>
            {pet ? (
                <div>
                    <p>Nombre: {pet.name}</p>
                    <p>Estado: {pet.state}</p>
                    <p>Edad: {pet.age}</p>
                    {/* Agrega más campos según lo que devuelva tu backend */}
                </div>
            ) : (
                <p>No se encontró información de la mascota.</p>
            )}

            <h1>Estado de la Mascota</h1>
            <p>Hambre: {petState.hambre}</p>
            <p>Sueño: {petState.sueño}</p>
            <p>Salud: {petState.salud}</p>
            <p>¿Está vivo?: {petState.vivo ? "Sí" : "No"}</p>
            
            <button onClick={handleFeed}>Alimentar</button>
            <button onClick={handleSleep}>Dormir</button>
            <button onClick={handleHeal}>Curar</button>
            <button onClick={handleRevive}>Revivir</button>
        </div>
    );
};

export default Pet;
