import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { API } from '../api/service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(API);
  const router = inject(Router);

  const loggedIn = auth.isLogIn();
  console.log('ini nilai yang di guard:', loggedIn);
  if (loggedIn) return true;

  router.navigate(['/login']);
  return false;
};
