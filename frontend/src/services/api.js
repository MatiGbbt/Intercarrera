import axios from 'axios';

const API_URL = 'http://localhost:6500/api'; // Cambia esto según tu configuración

// Registrar
export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

// Iniciar sesión
export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};

// Obtener perfil
export const getProfile = async () => {
    return await axios.get(`${API_URL}/profile`, { withCredentials: true });
};

export const getPetData = async () => {
    const response = await axios.get(`${API_URL}/pets`); // Asegúrate de que la ruta sea correcta
    return response.data;
};

// Obtener estado de la mascota
export const getPetState = async () => {
    return await axios.get(`${API_URL}/pet/state`, { withCredentials: true });
};

// Alimentar mascota
export const feedPet = async () => {
    return await axios.post(`${API_URL}/pet/feed`, {}, { withCredentials: true });
};

// Dormir mascota
export const sleepPet = async () => {
    return await axios.post(`${API_URL}/pet/sleep`, {}, { withCredentials: true });
};

// Curar mascota
export const healPet = async () => {
    return await axios.post(`${API_URL}/pet/heal`, {}, { withCredentials: true });
};

// Revivir mascota
export const revivePet = async () => {
    return await axios.post(`${API_URL}/pet/revive`, {}, { withCredentials: true });
};
