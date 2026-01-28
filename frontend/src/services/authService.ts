import api from './api';
import type { LoginDto, RegisterDto, AuthResponse } from '../interfaces/Auth';

export const authService = {
    login: async (credentials: LoginDto) => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    register: async (userData: RegisterDto) => {
        const response = await api.post<AuthResponse>('/auth/register', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    getToken: () => {
        return localStorage.getItem('token');
    },
};
