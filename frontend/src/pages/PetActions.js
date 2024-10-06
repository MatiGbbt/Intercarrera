// src/pages/PetActions.js
import React from 'react';
import { feedPet, sleepPet, healPet, revivePet } from '../services/api';

const PetActions = () => {
    const handleFeed = async () => {
        try {
            const response = await feedPet();
            console.log('Mascota alimentada:', response.data);
        } catch (error) {
            console.error('Error al alimentar la mascota:', error.response.data);
        }
    };

    const handleSleep = async () => {
        try {
            const response = await sleepPet();
            console.log('Mascota durmiendo:', response.data);
        } catch (error) {
            console.error('Error al dormir la mascota:', error.response.data);
        }
    };

    const handleHeal = async () => {
        try {
            const response = await healPet();
            console.log('Mascota curada:', response.data);
        } catch (error) {
            console.error('Error al curar la mascota:', error.response.data);
        }
    };

    const handleRevive = async () => {
        try {
            const response = await revivePet();
            console.log('Mascota revivida:', response.data);
        } catch (error) {
            console.error('Error al revivir la mascota:', error.response.data);
        }
    };

    return (
        <div>
            <h1>Acciones de la Mascota</h1>
            <button onClick={handleFeed}>Alimentar</button>
            <button onClick={handleSleep}>Dormir</button>
            <button onClick={handleHeal}>Curar</button>
            <button onClick={handleRevive}>Revivir</button>
        </div>
    );
};

export default PetActions;