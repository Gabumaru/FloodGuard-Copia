import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'https://server-production-c670.up.railway.app/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o token JWT a cada requisição
api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('userToken');

        if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de resposta para lidar com tokens expirados ou 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Tratamento para 401 Unauthorized 
        if(error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Marca a requisição para não tentar novamente infinitamente
            console.log("Token expirado ou não autorizado");
        }
        return Promise.reject(error);
    }
)

export default api;