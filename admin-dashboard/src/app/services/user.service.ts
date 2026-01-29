import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    gmail: string;
    phone: string;
    roleName: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    // Using the port found in backend/Properties/launchSettings.json
    private apiUrl = 'http://localhost:5178/api/users';

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    createUser(user: any): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }
}
