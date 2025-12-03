import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '../../api/service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css'],
})
export class LoginPage {
  identifier = '';
  password = '';

  constructor(private api: API, private router: Router) {}

  async login(e?: Event) {
    if (e) e.preventDefault();
    const res: any = await this.api.POST('/login', { identifier: this.identifier, password: this.password });
    if (res && res.status) {
      localStorage.setItem('user', JSON.stringify(res.data));
      this.router.navigate(['/pasien']);
    } else {
      const msg = res && res.message ? res.message : 'Login failed';
      alert(msg);
    }
  }
}
