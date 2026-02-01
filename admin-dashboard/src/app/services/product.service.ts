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
    stock: number;
    categoryId: number;
    category?: Category;
    images?: { id?: number; imageUrl: string }[];
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
        return this.http.get<Category[]>(this.categoryUrl);
    }

    uploadImages(files: FileList): Observable<{ urls: string[] }> {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });
        return this.http.post<{ urls: string[] }>('http://localhost:5178/api/files/upload', formData);
    }

    uploadFileList(files: File[]): Observable<{ urls: string[] }> {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
        return this.http.post<{ urls: string[] }>('http://localhost:5178/api/files/upload', formData);
    }
}
