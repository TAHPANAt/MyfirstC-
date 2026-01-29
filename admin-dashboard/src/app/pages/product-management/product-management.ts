import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService, Product, Category } from '../../services/product.service';

@Component({
    selector: 'app-product-management',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './product-management.html',
    styleUrl: './product-management.css'
})
export class ProductManagement implements OnInit {
    private productService = inject(ProductService);
    private fb = inject(FormBuilder);

    products = signal<Product[]>([]);
    categories = signal<Category[]>([]);
    isModalOpen = signal(false);

    productForm = this.fb.group({
        itemname: ['', [Validators.required]],
        description: [''],
        price: [0, [Validators.required, Validators.min(0)]],
        categoryId: ['', [Validators.required]]
    });

    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories();
    }

    loadProducts(): void {
        this.productService.getProducts().subscribe({
            next: (data) => this.products.set(data),
            error: (err) => console.error('Failed to fetch products', err)
        });
    }

    loadCategories(): void {
        this.productService.getCategories().subscribe({
            next: (data) => this.categories.set(data),
            error: (err) => console.error('Failed to fetch categories', err)
        });
    }

    toggleModal(): void {
        this.isModalOpen.set(!this.isModalOpen());
        if (!this.isModalOpen()) {
            this.productForm.reset({ price: 0 });
        }
    }

    onSubmit(): void {
        if (this.productForm.valid) {
            const formValue = this.productForm.value;
            // Ensure values match the Partial<Product> interface
            const payload: Partial<Product> = {
                itemname: formValue.itemname ?? '',
                description: formValue.description ?? '',
                price: formValue.price ?? 0,
                categoryId: Number(formValue.categoryId)
            };

            this.productService.createProduct(payload).subscribe({
                next: () => {
                    this.loadProducts();
                    this.toggleModal();
                },
                error: (err) => console.error('Failed to create product', err)
            });
        }
    }
}
