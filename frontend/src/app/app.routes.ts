import { Routes } from '@angular/router';
import { LayoutAuth } from './layout/auth/auth';
import { LayoutMain } from './layout/main/layout-main';
import { PasienPage } from './page/pasien/pasien-page';
import { RekamMedisPage } from './page/rekam-medis/rekam-medis';
import { authGuard } from './guards/auth.guard';
import { LoginPage } from './page/login/login-page';

export const routes: Routes = [
  {
    path: '',
    component: LayoutAuth,
    children: [
      { path: '', component: LoginPage },
      // { path: 'register', component: RegisterPage } // opsional
    ],
  },
  {
    path: '',
    component: LayoutMain,
    canActivate: [authGuard],
    children: [
      { path: 'pasien', component: PasienPage },
      { path: 'rekam-medis', component: RekamMedisPage },
    ],
  },
  { path: '**', redirectTo: '' }, // fallback
];
