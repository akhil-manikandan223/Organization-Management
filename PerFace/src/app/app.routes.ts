import { Routes } from '@angular/router';
import {LayoutWrapper} from './layout-wrapper/layout-wrapper';

/*export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/authentication/authentication-module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    component: LayoutWrapper,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../app/home/home-module').then(
            (m) => m.HomeModule
          ),
      },
    ]
  },
  { path: '**', redirectTo: '' },
];*/

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/authentication-module').then(m => m.AuthenticationModule),
    // No layout wrapper here - login/register modules handle their own routes
  },
  {
    path: '',
    component: LayoutWrapper,
    // canActivate: [AuthGuard], // Protect routes behind login
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./home/home-module').then(m => m.HomeModule),
      },
      {
        path: 'home',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

