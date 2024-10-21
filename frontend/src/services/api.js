import axios from 'axios';

// ROCIO / MATI : ACA NO LA PUDE SOLUCIONAR LOS PUERTOS NO VAN AL MISMO NUMERO
//INTENTE DE VARIAS FORMAS Y LA UNICA QUE ME TIRA FACTIBLE INTERNET ES CON PROXY
//NO CREO QUE ESO SEA ASI

const API_URL = 'http://localhost:4000/api'; // Cambia esto según tu configuración
axios.defaults.withCredentials = true;

//** ENDPOINTS DEL USER */
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

// Cerrar Sesión
export const logout = async () => {
    return await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

//** ENDPOINTS DE LA MASCOTA */
// Obtener estado de la mascota
export const getPetState = async () => {
    try {
        const response = await axios.get(`${API_URL}/state`);
        console.log('Respuesta del api:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching pet state:", error);
        throw error;
    }
};

// Alimentar mascota
export const feedPet = async () => {
    return await axios.get(`${API_URL}/feed`, {}, { withCredentials: true });
};

// Dormir mascota
export const sleepPet = async () => {
    return await axios.get(`${API_URL}/sleep`, {}, { withCredentials: true });
};

// Curar mascota
export const healPet = async () => {
    return await axios.get(`${API_URL}/heal`, {}, { withCredentials: true });
};

// Revivir mascota
export const revivePet = async () => {
    return await axios.get(`${API_URL}/revive`, {}, { withCredentials: true });
};
