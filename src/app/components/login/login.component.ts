import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="text-center mb-4">Login</h2>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" formControlName="email">
                  @if (loginForm.get('email')?.errors?.['required'] && loginForm.get('email')?.touched) {
                    <small class="text-danger">Email is required</small>
                  }
                  @if (loginForm.get('email')?.errors?.['email'] && loginForm.get('email')?.touched) {
                    <small class="text-danger">Please enter a valid email</small>
                  }
                </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control" formControlName="password">
                  @if (loginForm.get('password')?.errors?.['required'] && loginForm.get('password')?.touched) {
                    <small class="text-danger">Password is required</small>
                  }
                </div>
                <button type="submit" class="btn btn-primary w-100" [disabled]="loginForm.invalid">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe({
        next: (response) => {
          
          console.log('gettoken',this.authService.getToken())
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          console.error('Error logging in:', error);
        }
      });
    }
  }


  onSubmit2(): void {
    //this.router.navigate(['/posts']);

    if (this.loginForm.valid) {
      const formValue = this.loginForm.value as LoginForm;
      this.authService.login(formValue.email, formValue.password).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['/posts']);
      })
        /* .subscribe({
          next: (data) => this.router.navigate(['posts']),
          error: (error) => {
            console.error('Login failed', error);
            // Aquí podrías añadir un mensaje de error para el usuario
          }
        }); */
    }
  }
}