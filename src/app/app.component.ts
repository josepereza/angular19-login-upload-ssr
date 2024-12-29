import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" [routerLink]="['/posts']">Blog App</a>
        <a class="navbar-brand" [routerLink]="['/me']">My Posts</a>

        <div class="navbar-nav ms-auto">
          @if (authService.currentUser()) {
            <button class="btn btn-outline-danger" (click)="logout()">Logout</button>
          }@else {

            <a class="btn btn-outline-danger" [routerLink]="['/login']">Login</a>
          }
        </div>
      </div>
    </nav>
    <router-outlet />
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}