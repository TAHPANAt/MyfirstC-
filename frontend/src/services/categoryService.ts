import api from './api';
import type { Category } from '../interfaces/Category';

export const categoryService = {
    getAll: async () => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },
};
