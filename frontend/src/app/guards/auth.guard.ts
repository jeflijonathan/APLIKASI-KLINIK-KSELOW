import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { API } from '../api/service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(API);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return true;

  const tokenValid = (() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const now = Math.floor(Date.now() / 1000);
      return !!payload && typeof payload.exp === 'number' && payload.exp > now;
    } catch {
      return false;
    }
  })();

  const loggedIn = auth.isLogIn() || tokenValid;
  if (loggedIn) return true;

  router.navigate(['/login']);
  return false;
};
