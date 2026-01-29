import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Product {
    id: number;
    itemname: string;
    description: string;
    price: number;
    categoryId: number;
    category?: Category;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5178/api/items';
    private categoryUrl = 'http://localhost:5178/api/categories'; // Assuming CategoriesController exists or can be added

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    createProduct(product: Partial<Product>): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product);
    }

    getCategories(): Observable<Category[]> {
        // If CategoriesController doesn't exist, we might need to add it or handle it
        return this.http.get<Category[]>(this.categoryUrl);
    }
}
