import { Routes } from '@angular/router';
import { LayoutWrapper } from './layout-wrapper/layout-wrapper';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication-module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    component: LayoutWrapper,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./home/home-module').then((m) => m.HomeModule),
      },
      {
        path: 'home',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'system',
        loadChildren: () =>
          import('./system/system-module').then((m) => m.SystemModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
