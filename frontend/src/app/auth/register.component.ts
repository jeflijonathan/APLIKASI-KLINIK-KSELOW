import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Daftar Akun Baru</h2>
        <form (ngSubmit)="submit()" #form="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              [(ngModel)]="formData.username"
              name="username"
              placeholder="Masukkan username Anda"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              [(ngModel)]="formData.email"
              name="email"
              placeholder="Masukkan email Anda"
              required
            />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select
              id="role"
              class="form-control"
              [(ngModel)]="formData.role"
              name="role"
              required
            >
              <option value="">-- Pilih Role --</option>
              <option value="pasien">Pasien</option>
              <option value="dokter">Dokter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              [(ngModel)]="formData.password"
              name="password"
              placeholder="Minimal 6 karakter"
              required
            />
          </div>
          <button type="submit" class="btn btn-success btn-block" [disabled]="loading">
            {{ loading ? 'Loading...' : 'Daftar' }}
          </button>
        </form>
        <div class="auth-link">
          <p>Sudah punya akun? <a (click)="goToLogin()">Login di sini</a></p>
        </div>
        <div *ngIf="errorMessage" class="alert alert-danger mt-2">
          {{ errorMessage }}
        </div>
        <div *ngIf="successMessage" class="alert alert-success mt-2">
          {{ successMessage }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .register-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      padding: 40px;
      width: 100%;
      max-width: 450px;
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
      box-sizing: border-box;
    }
    select.form-control {
      cursor: pointer;
      background-color: white;
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
      background: linear-gradient(135deg, #52c41a 0%, #1890ff 100%);
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
      margin-top: 15px;
    }
    .alert-danger {
      border: 1px solid #f5c6cb;
      background-color: #f8d7da;
      color: #721c24;
    }
    .alert-success {
      border: 1px solid #c3e6cb;
      background-color: #d4edda;
      color: #155724;
    }
  `],
})
export class RegisterComponent {
  formData = { username: '', password: '', email: '', role: '' };
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.formData.username || !this.formData.password || !this.formData.email || !this.formData.role) {
      this.errorMessage = 'Semua field harus diisi';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register(this.formData).subscribe({
      next: () => {
        this.successMessage = 'Pendaftaran berhasil! Silakan login.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Gagal daftar. Coba username lain atau hubungi admin.';
        this.loading = false;
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
