import { Routes } from '@angular/router';
import { PasienPage } from './page/pasien/pasien-page';
import { LayoutMain } from './layout/main/layout-main';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMain,
    children: [
      { path: 'pasien', component: PasienPage },
      { path: 'rekam-medis', component: PasienPage },
    ],
  },
];
