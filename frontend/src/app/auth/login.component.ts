import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login Aplikasi Klinik</h2>
        <form (ngSubmit)="submit()" #form="ngForm">
          <div class="form-group">
            <label for="username">Username / Email</label>
            <input
              id="username"
              type="text"
              class="form-control"
              [(ngModel)]="formData.username"
              name="username"
              placeholder="Masukkan username atau email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              [(ngModel)]="formData.password"
              name="password"
              placeholder="Masukkan password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">
            {{ loading ? 'Loading...' : 'Login' }}
          </button>
        </form>
        <div class="auth-link">
          <p>Belum punya akun? <a (click)="goToRegister()">Daftar sekarang</a></p>
        </div>
        <div *ngIf="errorMessage" class="alert alert-danger mt-2">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .login-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      padding: 40px;
      width: 100%;
      max-width: 400px;
    }
    h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
      font-size: 24px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #555;
    }
    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s;
    }
    .form-control:focus {
      border-color: #667eea;
      outline: none;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    .btn-block {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      font-weight: 600;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .btn-block:hover:not(:disabled) {
      transform: translateY(-2px);
    }
    .btn-block:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .auth-link {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
    }
    .auth-link a {
      color: #667eea;
      cursor: pointer;
      text-decoration: none;
      font-weight: 600;
    }
    .auth-link a:hover {
      text-decoration: underline;
    }
    .alert {
      padding: 12px 15px;
      border-radius: 4px;
      border: 1px solid #f5c6cb;
      background-color: #f8d7da;
      color: #721c24;
    }
  `],
})
export class LoginComponent {
  formData = { username: '', password: '' };
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.formData.username || !this.formData.password) {
      this.errorMessage = 'Username/Email dan password harus diisi';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.login(this.formData).subscribe({
      next: () => {
        this.router.navigate(['/pasien']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login gagal. Periksa kembali username/email dan password.';
        this.loading = false;
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
