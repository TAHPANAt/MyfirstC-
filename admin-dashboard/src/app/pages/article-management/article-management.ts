import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ArticleService, Article } from '../../services/article.service';

@Component({
    selector: 'app-article-management',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './article-management.html',
    styleUrl: './article-management.css'
})
export class ArticleManagement implements OnInit {
    private articleService = inject(ArticleService);
    private fb = inject(FormBuilder);

    articles = signal<Article[]>([]);
    isModalOpen = signal(false);
    isEditMode = signal(false);
    currentArticleId = signal<number | null>(null);

    articleForm = this.fb.group({
        title: ['', [Validators.required]],
        content: ['', [Validators.required]],
        thumbnail: [''],
        authorId: [1] // Default for now, can be hooked to auth user later
    });

    ngOnInit(): void {
        this.loadArticles();
    }

    loadArticles(): void {
        this.articleService.getArticles().subscribe({
            next: (data) => this.articles.set(data),
            error: (err) => console.error('Failed to fetch articles', err)
        });
    }

    toggleModal(editMode = false, article?: Article): void {
        this.isEditMode.set(editMode);
        this.isModalOpen.set(!this.isModalOpen());

        if (this.isModalOpen()) {
            if (editMode && article) {
                this.currentArticleId.set(article.id);
                this.articleForm.patchValue({
                    title: article.title,
                    content: article.content,
                    thumbnail: article.thumbnail || '',
                    authorId: article.authorId
                });
            } else {
                this.currentArticleId.set(null);
                this.articleForm.reset({ authorId: 1 });
            }
        }
    }

    onSubmit(): void {
        if (this.articleForm.valid) {
            const formValue = this.articleForm.value;
            const payload: Partial<Article> = {
                title: formValue.title ?? '',
                content: formValue.content ?? '',
                thumbnail: formValue.thumbnail ?? '',
                authorId: formValue.authorId ?? 1
            };

            if (this.isEditMode() && this.currentArticleId()) {
                const updatedArticle = { ...payload, id: this.currentArticleId()! } as Article;
                this.articleService.updateArticle(this.currentArticleId()!, updatedArticle).subscribe({
                    next: () => {
                        this.loadArticles();
                        this.toggleModal();
                    },
                    error: (err) => console.error('Failed to update article', err)
                });
            } else {
                this.articleService.createArticle(payload).subscribe({
                    next: () => {
                        this.loadArticles();
                        this.toggleModal();
                    },
                    error: (err) => console.error('Failed to create article', err)
                });
            }
        }
    }

    deleteArticle(id: number): void {
        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?')) {
            this.articleService.deleteArticle(id).subscribe({
                next: () => this.loadArticles(),
                error: (err) => console.error('Failed to delete article', err)
            });
        }
    }
}
