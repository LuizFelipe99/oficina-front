import { LayoutComponent } from './core/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/pages/service-list/service-list.component')
            .then(m => m.ServiceListComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'clients',
    loadComponent: () =>
      import('./features/clients/pages/client-list/client-list.component')
        .then(m => m.ClientListComponent)
  },
  {
    path: 'clients/new',
    loadComponent: () =>
      import('./features/clients/pages/client-form/client-form.component')
        .then(m => m.ClientFormComponent)
  },
  {
    path: 'clients/edit/:id',
    loadComponent: () =>
      import('./features/clients/pages/client-form/client-form.component')
        .then(m => m.ClientFormComponent)
  }
];