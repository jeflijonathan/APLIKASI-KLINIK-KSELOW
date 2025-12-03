import { Routes } from '@angular/router';
import { PasienPage } from './page/pasien/pasien-page';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { LoginPage } from './page/login/login-page';
import { LayoutMain } from './layout/main/layout-main';
import { RekamMedisPage } from './page/rekam-medis/rekam-medis';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutMain,
    canActivate: [authGuard],
    children: [
      { path: 'pasien', component: PasienPage },
      { path: 'rekam-medis', component: RekamMedisPage },
    ],
  },
];
