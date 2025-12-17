import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-main.html',
  styleUrls: ['./layout-main.css'],
})
export class LayoutMain implements OnInit {
  isLoggedIn = false;
  username = '';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('username') || '';
      this.isLoggedIn = !!this.username;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/']);
  }
}
