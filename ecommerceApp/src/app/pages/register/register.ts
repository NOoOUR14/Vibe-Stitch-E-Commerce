import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', Validators.required] 
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:5000/api/users/signup', this.registerForm.value)
        .subscribe({
          next: (res: any) => {
            alert('Account created successfully! Please login.');
            this.router.navigate(['/login']);
          },
          error: (err:any) => {
            alert(err.error.message || 'Registration failed');
          }
        });
    }
  }
}
