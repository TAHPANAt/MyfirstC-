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

    // Picture Card Upload State
    selectedFileList: File[] = [];
    filePreviews = signal<string[]>([]);
    previewImageUrl = signal<string | null>(null);
    isPreviewOpen = signal(false);

    productForm = this.fb.group({
        itemname: ['', [Validators.required]],
        description: [''],
        price: [0, [Validators.required, Validators.min(0.01)]],
        stock: [0, [Validators.required, Validators.min(1)]],
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
            this.selectedFileList = [];
            this.filePreviews.set([]);
        }
    }

    onFileSelected(event: any): void {
        const files: FileList = event.target.files;
        if (!files) return;

        Array.from(files).forEach(file => {
            this.selectedFileList.push(file);
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.filePreviews.update(prev => [...prev, e.target.result]);
            };
            reader.readAsDataURL(file);
        });

        // Reset input to allow selecting same file again
        event.target.value = '';
    }

    removeImage(index: number): void {
        this.selectedFileList.splice(index, 1);
        this.filePreviews.update(prev => {
            const next = [...prev];
            next.splice(index, 1);
            return next;
        });
    }

    openPreview(url: string): void {
        this.previewImageUrl.set(url);
        this.isPreviewOpen.set(true);
    }

    closePreview(): void {
        this.isPreviewOpen.set(false);
    }

    onNumericInput(event: any, allowDecimal: boolean): void {
        const input = event.target;
        let value = input.value;

        // Remove any character that is not a digit or dot (if allowed)
        if (allowDecimal) {
            // Keep digits and at most one dot
            value = value.replace(/[^0-9.]/g, '');
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
        } else {
            // Keep only digits
            value = value.replace(/[^0-9]/g, '');
        }

        // Replace leading zero if followed by a digit (e.g., "01" -> "1")
        if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
            value = value.substring(1);
        }

        // If field becomes empty after filtering, default back to '0' to avoid empty state
        if (value === '') {
            value = '0';
        }

        input.value = value;
        // Update form control manually since we changed the native input value
        const controlName = input.getAttribute('formControlName');
        if (controlName) {
            this.productForm.get(controlName)?.setValue(value, { emitEvent: true });
        }
    }

    onSubmit(): void {
        if (this.productForm.valid) {
            const formValue = this.productForm.value;

            // Handle file upload first if files are selected
            if (this.selectedFileList.length > 0) {
                this.productService.uploadFileList(this.selectedFileList).subscribe({
                    next: (response) => {
                        const uploadedImages = response.urls.map(url => ({ imageUrl: url }));
                        this.saveProduct(formValue, uploadedImages);
                    },
                    error: (err) => {
                        console.error('Error uploading images:', err);
                        alert('Failed to upload images.');
                    }
                });
            } else {
                this.saveProduct(formValue, []);
            }
        }
    }

    private saveProduct(formValue: any, images: { imageUrl: string }[]): void {
        const payload: Partial<Product> = {
            itemname: formValue.itemname ?? '',
            description: formValue.description ?? '',
            price: Number(formValue.price) || 0,
            stock: Number(formValue.stock) || 0,
            categoryId: Number(formValue.categoryId),
            images: images
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
