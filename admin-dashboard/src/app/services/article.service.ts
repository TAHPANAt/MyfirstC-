import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
    id: number;
    title: string;
    content: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
    authorId: number;
}

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5178/api/articles';

    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(this.apiUrl);
    }

    getArticle(id: number): Observable<Article> {
        return this.http.get<Article>(`${this.apiUrl}/${id}`);
    }

    createArticle(article: Partial<Article>): Observable<Article> {
        return this.http.post<Article>(this.apiUrl, article);
    }

    updateArticle(id: number, article: Article): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, article);
    }

    deleteArticle(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
