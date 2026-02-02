import type { Category } from './Category';

export interface Item {
    id: number;
    itemname: string;
    description: string;
    price: number;
    categoryId: number;
    category?: Category;
    createdAt?: string;
    condition?: string;
}
