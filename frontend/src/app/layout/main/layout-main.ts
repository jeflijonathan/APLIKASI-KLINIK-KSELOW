import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../api/auth/service';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-main.html',
  styleUrls: ['./layout-main.css'],
})
export class LayoutMain {
  isLoggedIn = false;
  username = localStorage.getItem('username');

  constructor(private auth: AuthService, private router: Router) {
    this.auth.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}
