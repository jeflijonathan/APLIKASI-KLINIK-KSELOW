import { Routes } from '@angular/router';
import { PasienPage } from './page/pasien/pasien-page';
import { LayoutMain } from './layout/main/layout-main';
import { RekamMedisPage } from './page/rekam-medis/rekam-medis';
import { UserPage } from './page/user/user';
import { ListComponent } from './page/pasien/List/list';
import { LayoutAuth } from './layout/auth/auth';
import { LoginPage } from './page/login/login-page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutAuth,
    children: [{ path: '', component: LoginPage }],
  },
  {
    path: '',
    component: LayoutMain,
    canActivate: [authGuard],
    children: [
      { path: 'pasien', component: PasienPage },
      { path: 'rekam-medis', component: RekamMedisPage },
      { path: 'user', component: UserPage },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
