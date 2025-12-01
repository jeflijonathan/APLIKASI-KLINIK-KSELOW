import { Routes } from '@angular/router';
import { PasienPage } from './page/pasien/pasien-page';
import { LayoutMain } from './layout/main/layout-main';
import { RekamMedis } from './page/rekam-medis/rekam-medis';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMain,
    children: [
      { path: 'pasien', component: PasienPage },
      { path: 'rekam-medis', component: RekamMedis },
    ],
  },
];
