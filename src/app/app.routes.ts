import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'posts', 
    loadComponent: () => import('./components/post/post.component').then(m => m.PostsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'me', 
    loadComponent: () => import('./components/me/me.component').then(m => m.MeComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: '/posts', 
    pathMatch: 'full' 
  }
];