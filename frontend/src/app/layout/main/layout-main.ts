import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-main.html',
  styleUrls: ['./layout-main.css'],
})
export class LayoutMain {
  isLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.auth.user$.subscribe((u) => (this.isLoggedIn = !!u));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
