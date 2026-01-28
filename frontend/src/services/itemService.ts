import api from './api';
import type { Item } from '../interfaces/Item';

export const itemService = {
    getAll: async () => {
        const response = await api.get<Item[]>('/items');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await api.get<Item>(`/items/${id}`);
        return response.data;
    },
    create: async (item: Omit<Item, 'id'>) => {
        const response = await api.post<Item>('/items', item);
        return response.data;
    },
    update: async (id: number, item: Item) => {
        const response = await api.put(`/items/${id}`, item);
        return response.data;
    },
    delete: async (id: number) => {
        await api.delete(`/items/${id}`);
    },
};
