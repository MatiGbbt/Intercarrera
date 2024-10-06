import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6500/api',
    withCredentials: true,
});

// Funciones de autenticación
export const loginUser = (data) => api.post('/login', data);
export const logoutUser = () => api.post('/logout');

// Funciones de mascota
export const feedPet = () => api.post('/feed');
export const sleepPet = () => api.post('/sleep');
export const healPet = () => api.post('/heal');
export const revivePet = () => api.post('/revive');

// Obtener perfil de usuario
export const fetchProfile = () => api.get('/profile');