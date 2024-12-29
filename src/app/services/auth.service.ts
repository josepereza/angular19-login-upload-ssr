import { Injectable, signal,  PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://217.76.60.62:3000/auth';
  //private apiUrl = 'http://localhost:3000/auth';
  private isBrowser: boolean;


  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  currentUser = signal<User | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: object  , private http: HttpClient) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{access_token: string}>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
            console.log('authService',response)
            if (this.isBrowser) {
              localStorage.setItem('token', response.access_token);
            }
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
    if (this.isBrowser) {
          localStorage.setItem('token', token);

    }
  }

  getToken(): string | null {

    if (this.isBrowser) {
         return localStorage.getItem('token');

    }else return null

  }

  getToken2(): string | null {
    return this.tokenSubject.value;
  }
}