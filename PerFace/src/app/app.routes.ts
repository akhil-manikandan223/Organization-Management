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
      {
        path: 'employee-management',
        loadChildren: () =>
          import('./employee-management/employee-management-module').then(
            (m) => m.EmployeeManagementModule
          ),
      },
      {
        path: 'task-management',
        loadChildren: () =>
          import('./task-management/task-management-module').then(
            (m) => m.TaskManagementModule
          ),
      },
      {
        path: 'organization-structure',
        loadChildren: () =>
          import('./organization-structure/organization-structure-module').then(
            (m) => m.OrganizationStructureModule
          ),
      },
      {
        path: 'asset-management',
        loadChildren: () =>
          import('./asset-management/asset-management-module').then(
            (m) => m.AssetManagementModule
          ),
      },
      {
        path: 'communication',
        loadChildren: () =>
          import('./communication/communication-module').then(
            (m) => m.CommunicationModule
          ),
      },
      {
        path: 'reports-analytics',
        loadChildren: () =>
          import('./reports-analytics/reports-analytics-module').then(
            (m) => m.ReportsAnalyticsModule
          ),
      },
      {
        path: 'documents-management',
        loadChildren: () =>
          import('./documents-management/documents-management-module').then(
            (m) => m.DocumentsManagementModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
