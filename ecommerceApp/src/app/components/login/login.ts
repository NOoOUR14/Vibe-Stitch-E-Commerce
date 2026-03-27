import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
  if (this.loginForm.valid) {
    this.http.post('http://localhost:5000/api/auth/login', this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('Full Response from Server:', res);

          if (res.token) {
            this.authService.login(res.token);
          }

          const userRole = res.data?.user?.role || res.user?.role || res.role || (res.data && res.data.role);

          console.log('Detected Role:', userRole);

          if (userRole === 'admin') {
            console.log('Redirecting to Admin Dashboard...');
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/']);
          }

          alert('Welcome back!');
        },
        error: (err) => {
          console.error('Login Error:', err);
          alert(err.error?.message || 'Login failed! Check your Backend.');
        }
      });
  }
}}

