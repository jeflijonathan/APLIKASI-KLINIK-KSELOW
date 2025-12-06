import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../api/auth/service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css'],
})
export class LoginPage {
  state = signal({
    errorMessage: '',
  });
  private router = inject(Router);
  form;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get errorMessage() {
    return this.state().errorMessage;
  }

  handleLogin() {
    this.loading = true;
    if (this.form.invalid) {
      return;
    }

    const loginData = {
      identifier: this.form.value.identifier!,
      password: this.form.value.password!,
    };
    // Debug outgoing payload to ensure form values are correct
    console.log('[DEBUG] Sending login payload:', loginData);

    this.authService.Login(loginData, {
      onSuccess: (data) => {
        this.state.update((prev) => ({
          ...prev,
          errorMessage: '',
        }));
        localStorage.setItem('email', data.email);
        localStorage.setItem('username', data.username);
        localStorage.setItem('id_user', data.id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        this.router.navigate(['/dashboard/pasien']);
        console.log(data);
        this.loading = false;
      },
      onError: (err) => {
        console.log('error');
        this.state.update((prev) => ({
          ...prev,
          errorMessage: 'invalid password or username',
        }));
        this.loading = false;
      },
    });
  }
}
