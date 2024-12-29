import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://217.76.60.62:3000/auth';
  //private apiUrl = 'http://localhost:3000/auth';

  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{access_token: string}>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
            console.log('authService',response)
          localStorage.setItem('token', response.access_token);
          this.tokenSubject.next(response.access_token);
          //this.currentUser.set(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.currentUser.set(null);
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getToken2(): string | null {
    return this.tokenSubject.value;
  }
}