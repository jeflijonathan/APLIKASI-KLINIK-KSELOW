import { Injectable } from '@angular/core';
import { API } from '../api/service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: API) {}

  isLoggedIn(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const token = window.localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));

      const now = Math.floor(Date.now() / 1000);

      if (!payload.exp || payload.exp < now) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    }
  }
}